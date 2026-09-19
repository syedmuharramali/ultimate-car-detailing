import Booking, { STATUSES, SERVICES } from "../models/Booking.js";
import { sendNewBookingEmail } from "../utils/mailer.js";

// Day bucketing happens in the business's timezone, not the server's. The
// buckets used to be built from server-local dates but filled using
// toISOString() (UTC), so an evening booking in Toronto landed on the next
// day's bar in the dashboard chart.
const TIMEZONE = process.env.TIMEZONE || "America/Toronto";
const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Date -> "YYYY-MM-DD" as seen in TIMEZONE. */
function dayKey(date) {
  return dayKeyFormatter.format(date);
}

export async function createBooking(req, res) {
  try {
    const { name, phone, vehicle, service, address, preferredDate, preferredTime, notes } = req.body;

    if (!name || !phone || !vehicle || !address) {
      return res.status(400).json({ message: "Name, phone, vehicle, and address are required." });
    }

    const booking = await Booking.create({
      name, phone, vehicle, service, address, preferredDate, preferredTime, notes,
    });

    sendNewBookingEmail(booking).catch((err) =>
      console.error("Failed to send booking notification email:", err.message)
    );

    return res.status(201).json(booking);
  } catch (err) {
    console.error("Could not create booking:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid booking details." });
    }
    return res.status(500).json({ message: "Could not create booking." });
  }
}

export async function listBookings(req, res) {
  try {
    const { status } = req.query;

    // Validated against the known statuses. Passing req.query straight into the
    // filter let `?status[$ne]=pending` through as a Mongo operator object.
    if (status !== undefined && !STATUSES.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${STATUSES.join(", ")}` });
    }

    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (err) {
    console.error("Could not fetch bookings:", err);
    return res.status(500).json({ message: "Could not fetch bookings." });
  }
}

export async function updateBookingStatus(req, res) {
  try {
    const { status } = req.body;
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${STATUSES.join(", ")}` });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    return res.json(booking);
  } catch (err) {
    console.error("Could not update booking:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid booking id." });
    }
    return res.status(500).json({ message: "Could not update booking." });
  }
}

export async function getStats(req, res) {
  try {
    // Anchored at noon UTC on today's local date, so stepping back whole UTC
    // days never trips over a DST boundary.
    const anchor = new Date(`${dayKey(new Date())}T12:00:00Z`);

    const dayKeys = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(anchor);
      d.setUTCDate(d.getUTCDate() - i);
      dayKeys.push(d.toISOString().slice(0, 10));
    }

    // Query window padded a day either side to cover the UTC offset; the exact
    // filtering is done by day key below.
    const rangeStart = new Date(`${dayKeys[0]}T00:00:00Z`);
    rangeStart.setUTCDate(rangeStart.getUTCDate() - 1);

    const [total, byStatus, byService, recent, allForRepeat] = await Promise.all([
      Booking.countDocuments(),
      Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Booking.aggregate([{ $group: { _id: "$service", count: { $sum: 1 } } }]),
      Booking.find({ createdAt: { $gte: rangeStart } }).select("createdAt"),
      Booking.find().select("phone"),
    ]);

    const dayBuckets = Object.fromEntries(dayKeys.map((k) => [k, 0]));
    for (const b of recent) {
      const key = dayKey(b.createdAt);
      if (key in dayBuckets) dayBuckets[key] += 1;
    }
    const bookingsPerDay = dayKeys.map((date) => ({ date, count: dayBuckets[date] }));

    const thisWeekCount = bookingsPerDay.slice(-7).reduce((sum, d) => sum + d.count, 0);

    const phoneCounts = {};
    for (const b of allForRepeat) {
      const phone = (b.phone || "").replace(/\D/g, "");
      if (!phone) continue;
      phoneCounts[phone] = (phoneCounts[phone] || 0) + 1;
    }
    const repeatCustomers = Object.values(phoneCounts).filter((c) => c > 1).length;

    const statusBreakdown = STATUSES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    for (const row of byStatus) {
      if (row._id in statusBreakdown) statusBreakdown[row._id] = row.count;
    }

    const serviceBreakdown = SERVICES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    for (const row of byService) {
      if (row._id in serviceBreakdown) serviceBreakdown[row._id] = row.count;
    }

    return res.json({
      total, thisWeekCount, statusBreakdown, serviceBreakdown, bookingsPerDay, repeatCustomers,
    });
  } catch (err) {
    console.error("Could not compute booking stats:", err);
    return res.status(500).json({ message: "Could not compute stats." });
  }
}
