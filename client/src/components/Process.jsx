import { motion } from "framer-motion";

const STEPS = [
  { n: "1", title: "You message us", body: "Call or message with your vehicle and where you'll be parked." },
  { n: "2", title: "We come to you", body: "Home, office, or driveway — anywhere in the GTA & Surrounding Areas. No drop-off." },
  { n: "3", title: "We detail on-site", body: "Interior, wash, wax, rims and tires, handled while you carry on with your day." },
  { n: "4", title: "You inspect, we adjust", body: "Walk the car with us before we leave. Not happy with a spot? We fix it there." },
];

export default function Process() {
  return (
    <section id="process" className="border-t border-white/10 bg-panel/40">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <h2 className="mb-14 max-w-lg font-display text-4xl font-bold text-bone">
          How booking actually works.
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="relative"
            >
              <div className="font-display text-5xl font-bold text-gold/30">{step.n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold text-bone">{step.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-bone/60">{step.body}</p>
              {i < STEPS.length - 1 && (
                <div className="mt-8 hidden h-px w-full bg-white/10 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
