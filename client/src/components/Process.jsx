import { motion } from "framer-motion";
import Reveal, { RevealGroup, revealItem } from "@/components/magic/Reveal.jsx";

// Numbered because this genuinely is a sequence — the order carries
// information the reader needs, which is the only reason to number anything.
const STEPS = [
  {
    n: "STEP 01",
    title: "You message us",
    body: "Call or send the form with your vehicle and where it'll be parked.",
  },
  {
    n: "STEP 02",
    title: "We come to you",
    body: "Home, office or driveway — anywhere in the GTA. Nothing to drop off.",
  },
  {
    n: "STEP 03",
    title: "We detail on site",
    body: "Interior, wash, wax, rims and tires, handled while you carry on.",
  },
  {
    n: "STEP 04",
    title: "You inspect",
    body: "Walk the car with us. Not happy with a spot? We fix it before we go.",
  },
];

export default function Process() {
  return (
    <section id="process" className="cv-auto mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal className="mb-10 flex max-w-xl flex-col gap-3.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          How it works
        </p>
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] text-bone sm:text-5xl">
          Four steps.
          <br />
          That's the whole thing.
        </h2>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {STEPS.map((step) => (
          <motion.div key={step.n} variants={revealItem}>
            <div className="font-mono text-xs tracking-[0.14em] text-accent">{step.n}</div>
            <div className="relative my-3.5 h-px bg-border">
              <span className="absolute left-0 top-0 h-px w-7 bg-accent" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase leading-[0.95] text-bone">
              {step.title}
            </h3>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-text-secondary">
              {step.body}
            </p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
