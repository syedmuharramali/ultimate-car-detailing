import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    // In your connectDB function, update the options object:
const connection = await mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  family: 4,
  tls: true,
  autoSelectFamily: true, // <-- Add this line
  serverSelectionTimeoutMS: 10000,
});

    console.log(`MongoDB connected: ${connection.connection.host}`);

    return connection;
  } catch (err) {
    console.error("\n========== MONGODB CONNECTION ERROR ==========");
    console.error("Main error:", err.message);

    if (err.reason?.servers) {
      console.error("\n========== SERVER ERRORS ==========");

      for (const [host, server] of err.reason.servers) {
        console.error(`\nHOST: ${host}`);
        console.error("Type:", server.type);
        console.error("Error:", server.error);
      }
    }

    console.error("\n===============================================\n");

    throw err;
  }
};

export default connectDB;