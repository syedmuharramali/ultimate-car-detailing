import mongoose from "mongoose";

const SERVICE_OPTIONS = [
  "Complete Interior Detailing",
  "Complete Exterior Wash",
  "Hand Wax",
  "Rims Cleaning",
  "Tire Shine",
  "Full Package (all of the above)",
];

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    vehicle: { type: String, required: true, trim: true },
    service: { type: String, enum: SERVICE_OPTIONS, default: "Full Package (all of the above)" },
    address: { type: String, required: true, trim: true },
    preferredDate: { type: String, trim: true },
    preferredTime: { type: String, trim: true },
    notes: { type: String, trim: true, maxlength: 1000 },
    status: { type: String, enum: STATUS_OPTIONS, default: "pending" },
  },
  { timestamps: true }
);

export const SERVICES = SERVICE_OPTIONS;
export const STATUSES = STATUS_OPTIONS;
export default mongoose.model("Booking", bookingSchema);
