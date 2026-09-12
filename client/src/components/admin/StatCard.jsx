import { motion } from "framer-motion";
import CountUp from "../CountUp.jsx";

export default function StatCard({ label, value, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="rounded-sm border border-white/10 bg-panel p-6"
    >
      <div className="font-body text-xs uppercase tracking-wider text-bone/45">{label}</div>
      <div className="mt-2 font-display text-4xl font-bold text-gold">
        <CountUp value={value} />
      </div>
      {sub && <div className="mt-1 font-body text-sm text-bone/50">{sub}</div>}
    </motion.div>
  );
}
