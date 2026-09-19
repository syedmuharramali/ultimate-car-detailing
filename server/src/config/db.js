import dns from "node:dns";
import mongoose from "mongoose";

/**
 * Some home ISPs can't resolve MongoDB Atlas's SRV records, and the fix is to
 * point Node at a public resolver. That fix is local-only: a cloud host may
 * restrict outbound DNS or require its own internal resolver, so forcing
 * 1.1.1.1 there can turn a working deploy into a connection timeout.
 *
 * It is therefore opt-in. Set DNS_SERVERS=1.1.1.1,8.8.8.8 in your local .env
 * if Atlas won't resolve on your machine, and leave it unset in production.
 */
if (process.env.DNS_SERVERS) {
  const servers = process.env.DNS_SERVERS.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (servers.length) {
    dns.setServers(servers);
    console.log(`DNS resolvers overridden: ${servers.join(", ")}`);
  }
}

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      // `autoSelectFamily` races IPv6 and IPv4 and keeps whichever answers
      // first. It replaces the old `family: 4` pin, which forced IPv4 and
      // contradicted it — the two were set together before.
      autoSelectFamily: true,
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (err) {
    console.error("\n========== MONGODB CONNECTION ERROR ==========");
    console.error("Main error:", err.message);

    if (err.reason?.servers) {
      console.error("\n---------- per-server detail ----------");
      for (const [host, server] of err.reason.servers) {
        console.error(`HOST: ${host}`);
        console.error("  type:", server.type);
        console.error("  error:", server.error?.message ?? server.error);
      }
    }

    console.error(
      "\nCommon causes: the deploy host's IP is not on the Atlas network " +
        "access list, MONGODB_URI is wrong or still has <password> in it, or " +
        "the cluster is paused.\n"
    );
    throw err;
  }
};

export default connectDB;
