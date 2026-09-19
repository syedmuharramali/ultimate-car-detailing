import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ServiceChart({ breakdown }) {
  const data = Object.entries(breakdown).map(([service, count]) => ({ service, count })).sort((a, b) => b.count - a.count);
  return (
    <div className="rounded-sm border border-white/10 bg-panel p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-bone">Requests by service</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" allowDecimals={false} stroke="rgba(247,244,239,0.35)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="service" stroke="rgba(247,244,239,0.55)" fontSize={11} tickLine={false} axisLine={false} width={150} />
          <Tooltip contentStyle={{ background: "#0C0B0A", border: "1px solid rgba(247,244,239,0.14)", borderRadius: 4, fontSize: 12 }} labelStyle={{ color: "#F7F4EF" }} cursor={{ fill: "rgba(247,244,239,0.05)" }} />
          <Bar dataKey="count" fill="#D2743A" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
