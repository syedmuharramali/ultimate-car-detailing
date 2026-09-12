import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Services from "../components/Services.jsx";
import BookingTeaser from "../components/BookingTeaser.jsx";

const INCLUDED = [
  "We come to your home, office, or driveway — GTA & Surrounding Areas",
  "Professional-grade products on every job, not just the showcase ones",
  "A walkthrough with you before we leave, so nothing gets missed",
  "Satisfaction guaranteed — flag a spot and we fix it on the spot",
];

const FAQS = [
  { q: "Do I need to be home while you work?", a: "No — as long as we can access your vehicle and a nearby water/power source if needed, you're free to carry on with your day." },
  { q: "How long does a full detail take?", a: "Most full packages take 2–4 hours depending on vehicle size and condition. Single services are quicker." },
  { q: "What areas do you serve?", a: "The Greater Toronto Area and surrounding communities. Message us your location and we'll confirm." },
  { q: "How do I pay?", a: "We'll confirm payment details when we confirm your booking — no payment is required to submit a request." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gold">What we do</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-bone sm:text-6xl">Every service, done properly.</h1>
          <p className="mt-4 max-w-xl font-body text-bone/65">No shortcuts, no upsell games — just the work, done at your doorstep.</p>
        </motion.div>
      </section>

      <Services />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-8 font-display text-3xl font-bold text-bone">What's included every time</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold" />
              <p className="font-body text-sm leading-relaxed text-bone/75">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="mb-8 font-display text-3xl font-bold text-bone">Questions people ask</h2>
          <div className="divide-y divide-white/10">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold text-bone marker:content-none">
                  <span className="flex items-center justify-between">
                    {item.q}
                    <span className="text-gold transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 font-body text-sm leading-relaxed text-bone/65">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BookingTeaser />
    </>
  );
}
