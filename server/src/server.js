import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookings.js";
import authRoutes from "./routes/auth.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGINS || "*").split(",").map((s) => s.trim());

app.use(cors({ origin: allowedOrigins.includes("*") ? true : allowedOrigins }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
 .catch((err) => {
  console.error("Failed to connect to MongoDB:");
  console.error(err);
  process.exit(1);
});
