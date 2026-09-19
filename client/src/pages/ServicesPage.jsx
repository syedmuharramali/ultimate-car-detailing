import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Services from "../components/Services.jsx";
import SpecSheet from "../components/SpecSheet.jsx";
import BookingTeaser from "../components/BookingTeaser.jsx";
import Reveal, { RevealGroup, revealItem } from "@/components/magic/Reveal.jsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const INCLUDED = [
  "We come to your home, office, or driveway — GTA & Surrounding Areas",
  "Professional-grade products on every job, not just the showcase ones",
  "A walkthrough with you before we leave, so nothing gets missed",
  "Satisfaction guaranteed — flag a spot and we fix it on the spot",
];

const FAQS = [
  {
    q: "Do I need to be home while you work?",
    a: "No — as long as we can access your vehicle and a nearby water or power source if needed, you're free to carry on with your day.",
  },
  {
    q: "How long does a full detail take?",
    a: "Most full packages take 2–4 hours depending on vehicle size and condition. Single services are quicker.",
  },
  {
    q: "What areas do you serve?",
    a: "The Greater Toronto Area and surrounding communities. Message us your location and we'll confirm.",
  },
  {
    q: "How do I pay?",
    a: "We'll confirm payment details when we confirm your booking — no payment is required to submit a request.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-20">
        <Reveal className="flex flex-col gap-3.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">What we do</p>
          <h1 className="max-w-[14ch] font-display text-[clamp(40px,7vw,68px)] font-extrabold uppercase leading-[0.92] text-bone">
            Every service, done properly.
          </h1>
          <p className="max-w-[52ch] font-body text-[15px] leading-relaxed text-text-secondary">
            No shortcuts, no upsell games — just the work, done at your doorstep.
          </p>
        </Reveal>
      </section>

      <Services />

      <SpecSheet />

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal className="mb-8">
          <h2 className="font-display text-3xl font-bold uppercase text-bone sm:text-4xl">
            What's included every time
          </h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <motion.div key={item} variants={revealItem} className="flex items-start gap-3">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-accent" />
              <p className="font-body text-sm leading-relaxed text-bone/75">{item}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      <section className="border-t border-border bg-section/40">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
          <Reveal className="mb-6">
            <h2 className="font-display text-3xl font-bold uppercase text-bone sm:text-4xl">
              Questions people ask
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            {/* Radix accordion — keyboard, focus and aria handled, and the panel
                animates to its measured height instead of snapping. */}
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <BookingTeaser />
    </>
  );
}
