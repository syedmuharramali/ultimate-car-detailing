import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { loginLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/login", loginLimiter, login);
router.get("/me", requireAuth, me);

export default router;
