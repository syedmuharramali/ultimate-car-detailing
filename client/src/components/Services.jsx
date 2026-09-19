import { motion } from "framer-motion";
import { Sofa, Droplets, Sparkles, CircleDot, Disc } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal, { RevealGroup, revealItem } from "@/components/magic/Reveal.jsx";
import interiorAfter from "../assets/interior-after.webp";
import galleryFinish from "../assets/gallery-finish-02.webp";
import tireShine from "../assets/service-tire-shine.webp";
import serviceRims from "../assets/service-rims.webp";
import handWax from "../assets/service-hand-wax.webp";

// Every entry carries `caption`. Hand Wax and Rims Cleaning used to use a
// `body` key that no rendered card read, so both shipped with blank text.
const SERVICES = [
  {
    id: "interior",
    n: "01",
    title: "Complete Interior Detailing",
    caption:
      "Vacuumed, wiped and conditioned — every surface, every seam, including the ones you stopped noticing.",
    image: interiorAfter,
    alt: "A fully detailed car interior",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "exterior",
    n: "02",
    title: "Complete Exterior Wash",
    caption: "A hand wash that lifts grime without swirling the clear coat.",
    image: galleryFinish,
    alt: "A finished exterior after a hand wash",
  },
  {
    id: "wax",
    n: "03",
    title: "Hand Wax",
    caption: "A hand-applied layer that holds the shine for weeks, not days.",
    image: handWax,
    alt: "Wax applied by hand to a car panel",
  },
  {
    id: "rims",
    n: "04",
    title: "Rims Cleaning",
    caption:
      "Brake dust stripped back to bare, polished metal — the part of a car people look at first and wash last.",
    image: serviceRims,
    alt: "A cleaned and polished alloy rim",
    // Fills the last row so the three-column bento has no empty cell.
    span: "md:col-span-2",
  },
  {
    id: "tires",
    n: "05",
    title: "Tire Shine",
    caption: "Deep black tires that finish the whole look.",
    image: tireShine,
    alt: "Tire dressing applied for a deep black finish",
  },
];

const ICONS = {
  interior: Sofa,
  exterior: Droplets,
  wax: Sparkles,
  rims: CircleDot,
  tires: Disc,
};

function ServiceCard({ service }) {
  const Icon = ICONS[service.id];
  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "group relative isolate flex min-h-[230px] flex-col justify-end overflow-hidden rounded-sm border border-border p-5 sm:p-6",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-accent/45 hover:shadow-[0_18px_44px_rgba(0,0,0,0.45)]",
        service.span
      )}
    >
      <img
        src={service.image}
        alt={service.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(12,11,10,0.94)_6%,rgba(12,11,10,0.4)_58%,rgba(12,11,10,0.12)_100%)]" />

      <span className="absolute right-5 top-5 font-mono text-[11px] tracking-[0.1em] text-accent">
        {service.n}
      </span>
      <Icon size={24} className="absolute left-5 top-5 text-accent drop-shadow" />

      <h3 className="font-display text-xl font-bold uppercase leading-[0.95] text-bone drop-shadow sm:text-2xl">
        {service.title}
      </h3>
      <p className="mt-2 max-w-[34ch] font-body text-[13.5px] leading-relaxed text-bone/70 drop-shadow">
        {service.caption}
      </p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="cv-auto mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal className="mb-10 flex max-w-xl flex-col gap-3.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Services</p>
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] text-bone sm:text-5xl">
          Five services.
          <br />
          One standard.
        </h2>
        <p className="font-body text-[15px] leading-relaxed text-text-secondary">
          Book any one on its own, or the full package in a single visit.
        </p>
      </Reveal>

      {/* Auto rows rather than a fixed 3x2: five cards with one spanning 2x2
          needs more cells than six, and the old grid silently overflowed. */}
      <RevealGroup className="grid grid-cols-1 gap-3.5 md:auto-rows-[minmax(230px,1fr)] md:grid-cols-3">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </RevealGroup>
    </section>
  );
}
