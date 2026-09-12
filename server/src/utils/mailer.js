import nodemailer from "nodemailer";

// This project only sends through Gmail. Nodemailer is the library doing
// the sending — "service: gmail" tells it to use Gmail's known SMTP
// settings automatically, so you don't need to specify a host/port.
// GMAIL_USER + GMAIL_APP_PASSWORD (an App Password, not your real Gmail
// password — see README) are the only two credentials this needs.
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

export async function sendNewBookingEmail(booking) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.NOTIFY_EMAIL) {
    console.log("Gmail not configured — skipping new booking notification.");
    return;
  }

  const t = getTransporter();

  const lines = [
    `New booking request from ${booking.name}`,
    ``,
    `Phone: ${booking.phone}`,
    `Vehicle: ${booking.vehicle}`,
    `Service: ${booking.service}`,
    `Address: ${booking.address}`,
    `Preferred date: ${booking.preferredDate || "Not specified"}`,
    `Preferred time: ${booking.preferredTime || "Not specified"}`,
    `Notes: ${booking.notes || "None"}`,
  ];

  await t.sendMail({
    from: `"Ultimate Car Detailing Site" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New booking: ${booking.name} — ${booking.service}`,
    text: lines.join("\n"),
  });
}
