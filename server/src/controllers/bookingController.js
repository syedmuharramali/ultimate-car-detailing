import Booking, { STATUSES, SERVICES } from "../models/Booking.js";
import { sendNewBookingEmail } from "../utils/mailer.js";

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
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const thirtyDaysAgo = new Date(startOfToday);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

    const [total, byStatus, byService, last30, allForRepeat] = await Promise.all([
      Booking.countDocuments(),
      Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Booking.aggregate([{ $group: { _id: "$service", count: { $sum: 1 } } }]),
      Booking.find({ createdAt: { $gte: thirtyDaysAgo } }).select("createdAt"),
      Booking.find().select("phone"),
    ]);

    const dayBuckets = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo);
      d.setDate(d.getDate() + i);
      dayBuckets[d.toISOString().slice(0, 10)] = 0;
    }
    for (const b of last30) {
      const key = b.createdAt.toISOString().slice(0, 10);
      if (key in dayBuckets) dayBuckets[key] += 1;
    }
    const bookingsPerDay = Object.entries(dayBuckets).map(([date, count]) => ({ date, count }));

    const thisWeekCount = bookingsPerDay
      .filter((d) => new Date(d.date) >= sevenDaysAgo)
      .reduce((sum, d) => sum + d.count, 0);

    const phoneCounts = {};
    for (const b of allForRepeat) phoneCounts[b.phone] = (phoneCounts[b.phone] || 0) + 1;
    const repeatCustomers = Object.values(phoneCounts).filter((c) => c > 1).length;

    const statusBreakdown = STATUSES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    for (const row of byStatus) statusBreakdown[row._id] = row.count;

    const serviceBreakdown = SERVICES.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    for (const row of byService) serviceBreakdown[row._id] = row.count;

    const topService = Object.entries(serviceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return res.json({
      total, thisWeekCount, statusBreakdown, serviceBreakdown, bookingsPerDay, repeatCustomers, topService,
    });
  } catch (err) {
    console.error("Could not compute booking stats:", err);
    return res.status(500).json({ message: "Could not compute stats." });
  }
}
