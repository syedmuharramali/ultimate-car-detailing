import rateLimit from "express-rate-limit";

const sharedOptions = {
  standardHeaders: "draft-7",
  legacyHeaders: false,
};

export const loginLimiter = rateLimit({
  ...sharedOptions,
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  message: { message: "Too many login attempts. Please try again in 15 minutes." },
});

export const bookingLimiter = rateLimit({
  ...sharedOptions,
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { message: "Too many booking requests from this connection. Please try again in an hour." },
});
