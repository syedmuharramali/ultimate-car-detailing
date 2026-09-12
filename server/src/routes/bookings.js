import { Router } from "express";
import { createBooking, listBookings, updateBookingStatus, getStats } from "../controllers/bookingController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/", createBooking);
router.get("/stats", requireAuth, getStats);
router.get("/", requireAuth, listBookings);
router.patch("/:id/status", requireAuth, updateBookingStatus);

export default router;
