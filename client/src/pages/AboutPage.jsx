import { motion } from "framer-motion";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
import TiltCard from "../components/TiltCard.jsx";
import detailer from "../assets/professional-detailer.webp";
import BookingTeaser from "../components/BookingTeaser.jsx";

const VALUES = [
  { icon: ShieldCheck, title: "Professional care", body: "Every vehicle gets the same standard, whether it's a daily driver or something you baby." },
  { icon: Clock, title: "Your time, respected", body: "We come to you — no dropping off, no waiting around at a shop." },
  { icon: Sparkles, title: "Attention to detail", body: "The kind of finish that holds up under a work light, not just a quick glance." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-20 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">About us</p>
          <h1 className="mt-3 max-w-[14ch] font-display text-[clamp(40px,7vw,68px)] font-extrabold uppercase leading-[0.92] text-bone">We bring the detail shop to you.</h1>
          <p className="mt-5 max-w-lg font-body leading-relaxed text-bone/70">
            Ultimate Car Detailing is a mobile detailing service built
            around one idea: your car should get showroom-level care
            without you having to go anywhere for it. We've detailed
            500+ vehicles across the GTA &amp; Surrounding Areas, one
            driveway at a time.
          </p>
        </motion.div>

        <TiltCard className="overflow-hidden rounded-sm border border-white/10" maxTilt={7}>
          <img src={detailer} alt="Detailer inspecting paintwork under a work light" className="h-full w-full object-cover" />
        </TiltCard>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-12 max-w-lg font-display text-3xl font-bold text-bone">What we hold ourselves to.</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <v.icon size={28} className="text-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold text-bone">{v.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-bone/60">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingTeaser />
    </>
  );
}
