import { Router } from "express";
import { createBooking, listBookings, updateBookingStatus, getStats } from "../controllers/bookingController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { bookingLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/", bookingLimiter, createBooking);
router.get("/stats", requireAuth, getStats);
router.get("/", requireAuth, listBookings);
router.patch("/:id/status", requireAuth, updateBookingStatus);

export default router;
