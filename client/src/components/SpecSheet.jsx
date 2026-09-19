import Reveal, { RevealGroup, revealItem } from "@/components/magic/Reveal.jsx";
import { motion } from "framer-motion";

// A detail job has a spec sheet. Real figures, set like a vehicle spec table —
// this is the section that answers what people actually want to know before
// they call, and the mono column makes it scannable.
const SPEC = [
  {
    k: "Where",
    v: "Your home, office or driveway, anywhere in the GTA and surrounding areas. No drop-off, no waiting room.",
    t: "MOBILE",
  },
  {
    k: "How long",
    v: "A full package runs 2–4 hours depending on vehicle size and condition. Single services are quicker.",
    t: "2–4 HRS",
  },
  {
    k: "Products",
    v: "Professional-grade throughout — the same products on a daily driver as on a showcase car.",
    t: "PRO GRADE",
  },
  {
    k: "Walkthrough",
    v: "We walk the vehicle with you before we leave. Flag a spot and we fix it on the spot.",
    t: "INCLUDED",
  },
  {
    k: "Payment",
    v: "Nothing due to request a booking. We confirm the time and the price by phone first.",
    t: "ON COMPLETION",
  },
];

export default function SpecSheet() {
  return (
    <section id="included" className="cv-auto border-t border-border bg-section/40">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal className="mb-10 flex max-w-xl flex-col gap-3.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            What's included
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] text-bone sm:text-5xl">
            Every job,
            <br />
            every time.
          </h2>
          <p className="font-body text-[15px] leading-relaxed text-text-secondary">
            No packages to decode and no upsell at the door. This is the standard on
            all five services.
          </p>
        </Reveal>

        <RevealGroup className="border-t border-border" stagger={0.05}>
          {SPEC.map((row) => (
            <motion.div
              key={row.k}
              variants={revealItem}
              className="grid grid-cols-1 gap-1 border-b border-border py-4.5 sm:grid-cols-[200px_1fr_140px] sm:items-baseline sm:gap-6"
            >
              <div className="font-display text-lg font-bold uppercase text-bone">{row.k}</div>
              <div className="font-body text-sm leading-relaxed text-text-secondary">{row.v}</div>
              <div className="font-mono text-xs tabular-nums text-accent sm:text-right">
                {row.t}
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
