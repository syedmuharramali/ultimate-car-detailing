import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TrendChart({ data }) {
  const formatted = data.map((d) => ({ ...d, label: d.date.slice(5) }));
  return (
    <div className="rounded-sm border border-white/10 bg-panel p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-bone">Bookings, last 30 days</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={formatted}>
          <defs>
            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C6A15B" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#C6A15B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" stroke="rgba(243,241,234,0.35)" fontSize={11} tickLine={false} axisLine={false} interval={4} />
          <YAxis allowDecimals={false} stroke="rgba(243,241,234,0.35)" fontSize={11} tickLine={false} axisLine={false} width={24} />
          <Tooltip contentStyle={{ background: "#17171A", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, fontSize: 12 }} labelStyle={{ color: "#F3F1EA" }} />
          <Area type="monotone" dataKey="count" stroke="#C6A15B" strokeWidth={2} fill="url(#goldFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
