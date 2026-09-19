import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api, clearToken } from "../../lib/adminApi.js";
import StatCard from "../../components/admin/StatCard.jsx";
import TrendChart from "../../components/admin/TrendChart.jsx";
import ServiceChart from "../../components/admin/ServiceChart.jsx";
import BookingsTable from "../../components/admin/BookingsTable.jsx";

const FILTERS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsData, bookingsData] = await Promise.all([
        api.stats(),
        api.listBookings(filter === "all" ? undefined : filter),
      ]);
      setStats(statsData);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  function handleLogout() {
    clearToken();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-graphite">
      <header className="border-b border-white/10 bg-panel/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="leading-none">
            <div className="font-display text-xl font-bold text-bone">ULTIMATE</div>
            <div className="-mt-1 font-display text-[10px] tracking-[0.3em] text-accent">CAR DETAILING · ADMIN</div>
          </div>
          <button onClick={handleLogout} className="font-body text-sm text-bone/55 hover:text-bone">Log out</button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {error && (
          <p className="mb-6 rounded-sm border border-danger/40 bg-danger/10 px-4 py-3 font-body text-sm text-danger">{error}</p>
        )}

        {stats && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Total bookings" value={stats.total} />
              <StatCard label="This week" value={stats.thisWeekCount} sub="Last 7 days" />
              <StatCard label="Pending" value={stats.statusBreakdown.pending} sub="Need a response" />
              <StatCard label="Repeat customers" value={stats.repeatCustomers} sub="2+ bookings, same phone" />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <TrendChart data={stats.bookingsPerDay} />
              <ServiceChart breakdown={stats.serviceBreakdown} />
            </div>
          </>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-bone">Bookings</h2>
          <div className="flex gap-1 rounded-full border border-white/10 bg-panel p-1">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-3 py-1.5 font-body text-xs capitalize transition-colors ${
                  filter === f ? "bg-accent text-graphite" : "text-bone/55 hover:text-bone"
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="rounded-sm border border-white/10 bg-panel p-8 text-center font-body text-bone/50">Loading...</div>
        ) : (
          <BookingsTable bookings={bookings} onChanged={load} />
        )}
      </main>
    </div>
  );
}
