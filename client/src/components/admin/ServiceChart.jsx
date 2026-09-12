import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ServiceChart({ breakdown }) {
  const data = Object.entries(breakdown).map(([service, count]) => ({ service, count })).sort((a, b) => b.count - a.count);
  return (
    <div className="rounded-sm border border-white/10 bg-panel p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-bone">Requests by service</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" allowDecimals={false} stroke="rgba(243,241,234,0.35)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="service" stroke="rgba(243,241,234,0.55)" fontSize={11} tickLine={false} axisLine={false} width={150} />
          <Tooltip contentStyle={{ background: "#17171A", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, fontSize: 12 }} labelStyle={{ color: "#F3F1EA" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="count" fill="#C6A15B" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
