import { motion } from "framer-motion";
import NumberTicker from "@/components/magic/NumberTicker.jsx";
import { RevealGroup, revealItem } from "@/components/magic/Reveal.jsx";

const STATS = [
  { value: 500, suffix: "+", label: "Vehicles detailed" },
  { value: 78, suffix: "%", label: "Would recommend us" },
  { static: "2–4", label: "Hours, full package" },
  { static: "$0", label: "Due at booking" },
];

export default function SocialProof() {
  return (
    <section className="cv-auto mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
      <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-4">
        {STATS.map((s) => (
          <motion.div key={s.label} variants={revealItem} className="bg-graphite px-5 py-6 sm:px-6 sm:py-7">
            <b className="block font-display text-[clamp(32px,4.6vw,46px)] font-extrabold leading-none tabular-nums text-accent">
              {s.static ? s.static : <NumberTicker value={s.value} suffix={s.suffix} />}
            </b>
            <span className="mt-2 block font-body text-[12.5px] text-text-secondary">{s.label}</span>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
