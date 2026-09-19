import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TrendChart({ data }) {
  const formatted = data.map((d) => ({ ...d, label: d.date.slice(5) }));
  return (
    <div className="rounded-sm border border-white/10 bg-panel p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-bone">Bookings, last 30 days</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={formatted}>
          <defs>
            <linearGradient id="accentFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D2743A" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#D2743A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" stroke="rgba(247,244,239,0.35)" fontSize={11} tickLine={false} axisLine={false} interval={4} />
          <YAxis allowDecimals={false} stroke="rgba(247,244,239,0.35)" fontSize={11} tickLine={false} axisLine={false} width={24} />
          <Tooltip contentStyle={{ background: "#0C0B0A", border: "1px solid rgba(247,244,239,0.14)", borderRadius: 4, fontSize: 12 }} labelStyle={{ color: "#F7F4EF" }} />
          <Area type="monotone" dataKey="count" stroke="#D2743A" strokeWidth={2} fill="url(#accentFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
