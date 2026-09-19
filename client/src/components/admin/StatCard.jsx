import { motion } from "framer-motion";
import NumberTicker from "@/components/magic/NumberTicker.jsx";

export default function StatCard({ label, value, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="rounded-sm border border-border bg-panel p-6"
    >
      <div className="font-body text-xs uppercase tracking-wider text-text-secondary">{label}</div>
      <div className="mt-2 font-display text-4xl font-bold text-accent">
        <NumberTicker value={value} />
      </div>
      {sub && <div className="mt-1 font-body text-sm text-text-secondary">{sub}</div>}
    </motion.div>
  );
}
