const ITEMS = ["WE COME TO YOU", "DOORSTEP SERVICE", "PREMIUM PRODUCTS", "SATISFACTION GUARANTEED", "GTA WIDE"];

export default function Marquee() {
  const row = ITEMS.join("   \u2726   ") + "   \u2726   ";
  return (
    <div className="overflow-hidden border-y border-white/10 bg-panel py-3">
      <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-8">
        <span className="whitespace-nowrap font-display text-sm tracking-[0.25em] text-bone/60">
          {row.repeat(3)}
        </span>
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
