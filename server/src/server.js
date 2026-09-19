import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookings.js";
import authRoutes from "./routes/auth.js";

// Fail loudly at boot instead of returning a mysterious 500 on the first
// login attempt because JWT_SECRET was never set in the deploy environment.
const REQUIRED_ENV = ["MONGODB_URI", "JWT_SECRET"];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required environment variable(s): ${missingEnv.join(", ")}`);
  console.error("Set these in your host's environment settings, then redeploy.");
  process.exit(1);
}

const app = express();

/**
 * Origins are normalised before comparison. A trailing slash on
 * CLIENT_ORIGINS is the most common reason a correctly-configured deploy
 * still gets blocked: the browser's Origin header never carries one, so the
 * string compare silently fails and every request 403s.
 */
const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((s) => s.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const allowAll = allowedOrigins.length === 0 || allowedOrigins.includes("*");

if (allowAll && process.env.NODE_ENV === "production") {
  console.warn(
    "CLIENT_ORIGINS is unset — the API will accept requests from any origin. " +
      "Set it to your deployed frontend URL."
  );
}

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header: curl, server-to-server, and uptime/health checks.
      // Those are not browser requests, so there is nothing to protect here.
      if (!origin) return callback(null, true);
      if (allowAll) return callback(null, true);
      if (allowedOrigins.includes(origin.replace(/\/+$/, ""))) return callback(null, true);
      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);

// Render, Railway and Fly put the app behind exactly one reverse proxy. This
// preserves the customer's real IP for rate limiting while leaving local
// development untouched.
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));

// Two health endpoints: hosts differ on whether they probe / or a path.
app.get("/", (req, res) => res.json({ ok: true, service: "ultimate-car-detailing-api" }));
app.get("/api/health", (req, res) => res.json({ ok: true, uptime: Math.round(process.uptime()) }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Backstop: without this an unexpected throw returns Express's HTML error
// page and the client's res.json() parse fails with a confusing message.
// A CORS rejection lands here too, so it is answered as JSON with a 403
// rather than a 500 that looks like the server broke.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err?.message?.startsWith("Origin not allowed by CORS")) {
    console.warn(err.message);
    return res.status(403).json({ message: "This origin is not allowed to call the API." });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ message: "Something went wrong." });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    // Bind 0.0.0.0, not localhost — a container's health check reaches the
    // process from outside its own loopback interface.
    const server = app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );

    // Hosts send SIGTERM before replacing an instance. Closing cleanly lets
    // an in-flight booking finish writing instead of being cut off.
    for (const signal of ["SIGTERM", "SIGINT"]) {
      process.on(signal, () => {
        console.log(`${signal} received — shutting down.`);
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 10000).unref();
      });
    }
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:");
    console.error(err);
    process.exit(1);
  });
