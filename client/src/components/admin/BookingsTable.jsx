import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/adminApi.js";

const STATUS_STYLES = {
  pending: "bg-warn/20 text-warn",
  confirmed: "bg-steel/40 text-bone",
  completed: "bg-good/20 text-good",
  cancelled: "bg-danger/20 text-danger",
};
const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingsTable({ bookings, onChanged }) {
  const [updatingId, setUpdatingId] = useState(null);

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    try {
      await api.updateStatus(id, status);
      onChanged();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-sm border border-white/10 bg-panel p-8 text-center font-body text-bone/50">
        No bookings yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-white/10 bg-panel">
      <table className="w-full text-left font-body text-sm">
        <thead>
          <tr className="border-b border-white/10 text-bone/45">
            <th className="px-4 py-3 text-xs font-normal uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-xs font-normal uppercase tracking-wider">Vehicle</th>
            <th className="px-4 py-3 text-xs font-normal uppercase tracking-wider">Service</th>
            <th className="px-4 py-3 text-xs font-normal uppercase tracking-wider">Preferred</th>
            <th className="px-4 py-3 text-xs font-normal uppercase tracking-wider">Received</th>
            <th className="px-4 py-3 text-xs font-normal uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <motion.tr
              key={b._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="border-b border-white/5 last:border-0"
            >
              <td className="px-4 py-3">
                <div className="text-bone">{b.name}</div>
                <div className="text-bone/45">{b.phone}</div>
              </td>
              <td className="px-4 py-3 text-bone/75">{b.vehicle}</td>
              <td className="px-4 py-3 text-bone/75">{b.service}</td>
              <td className="px-4 py-3 text-bone/75">{b.preferredDate || "—"} {b.preferredTime || ""}</td>
              <td className="px-4 py-3 text-bone/45">{new Date(b.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <select
                  value={b.status}
                  disabled={updatingId === b._id}
                  onChange={(e) => handleStatusChange(b._id, e.target.value)}
                  className={`rounded-full border-0 px-3 py-1 font-body text-xs font-medium ${STATUS_STYLES[b.status]}`}
                >
                  {STATUSES.map((s) => <option key={s} value={s} className="bg-graphite text-bone">{s}</option>)}
                </select>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
