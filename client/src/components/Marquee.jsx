const ITEMS = [
  "We come to you",
  "Doorstep service",
  "Premium products",
  "Satisfaction guaranteed",
  "GTA wide",
];

/**
 * Magic UI — Marquee. Two identical tracks translating by -50% gives a seam
 * that never shows, which is what the single-track version could not do.
 */
export default function Marquee() {
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-border bg-section"
    >
      <div className="flex w-max animate-marquee py-3 font-display text-[15px] font-bold uppercase tracking-[0.24em] text-bone/35">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex">
            {ITEMS.map((item) => (
              <span key={item} className="whitespace-nowrap px-7">
                {item} <span className="text-accent-dim">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
