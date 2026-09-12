import { useState } from "react";
import { Sofa, Droplets, Sparkles, CircleDot, Disc } from "lucide-react";
import TiltCard from "./TiltCard.jsx";
import interiorBefore from "../assets/interior-before.webp";
import interiorAfter from "../assets/interior-after.webp";
import exteriorBefore from "../assets/exterior-before.webp";
import exteriorAfter from "../assets/exterior-after.webp";
import tireShine from "../assets/service-tire-shine.webp";
import serviceRims from '../assets/service-rims.webp';
import handWax from "../assets/service-hand-wax.webp";

const SERVICES = [
  {
    id: "interior",
    title: "Complete Interior Detailing",
    caption: "Vacuumed, wiped, and conditioned — every surface.",
    before: interiorBefore,
    after: interiorAfter,
    icon: Sofa,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "exterior",
    title: "Complete Exterior Wash",
    caption: "A hand wash that lifts grime without swirling the clear coat.",
    before: exteriorBefore,
    after: exteriorAfter,
    icon: Droplets,
  },
  {
    id: "tires",
    title: "Tire Shine",
    caption: "Deep black tires that finish the whole look.",
    image: tireShine,
    icon: Disc,
  },
  {
    id: "wax",
    title: "Hand Wax",
    body: "A hand-applied wax layer that holds the shine for weeks.",
    image:handWax,
    icon: Sparkles,
  },
  {
    id: "rims",
    title: "Rims Cleaning",
    body: "Rims stripped back to bare, polished metal.",
    image:serviceRims,
    icon: CircleDot,
  },
];

function PhotoCard({ service }) {
  const [hover, setHover] = useState(false);
  const Icon = service.icon;
  return (
    <TiltCard
      className={`overflow-hidden rounded-sm border border-white/10 ${service.span ?? ""}`}
      maxTilt={6}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ minHeight: "220px" }}
        className="relative h-full"
      >
        <img
          src={service.before}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: hover ? 0 : 1 }}
        />
        <img
          src={service.after}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: hover ? 1 : 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-6">
          <Icon size={26} className="text-gold drop-shadow" />
          <div>
            <span className="mb-2 inline-block rounded-full bg-graphite/70 px-3 py-1 font-body text-xs uppercase tracking-wider text-gold">
              {hover ? "After" : "Before"}
            </span>
            <h3 className="font-display text-xl font-semibold text-bone drop-shadow">
              {service.title}
            </h3>
            <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-bone/80 drop-shadow">
              {service.caption}
            </p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function ImageCard({ service }) {
  const Icon = service.icon;
  return (
    <TiltCard className="overflow-hidden rounded-sm border border-white/10" maxTilt={6}>
      <img
        src={service.image}
        alt=""
        className="h-full min-h-[220px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <Icon size={26} className="text-gold drop-shadow" />
        <div>
          <h3 className="font-display text-xl font-semibold text-bone drop-shadow">
            {service.title}
          </h3>
          <p className="mt-1 font-body text-sm leading-relaxed text-bone/80 drop-shadow">
            {service.caption}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

function IconCard({ service }) {
  const [hover, setHover] = useState(false);
  const Icon = service.icon;
  return (
    <TiltCard
      className="overflow-hidden rounded-sm border border-white/10 bg-panel p-6"
      maxTilt={6}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-teal to-graphite transition-[clip-path] duration-500 ease-out"
          style={{
            clipPath: hover
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 0 0, 0 100%, 0 100%)",
          }}
        />
        <div className="relative flex h-full min-h-[220px] flex-col justify-between">
          <Icon size={28} className={`transition-colors duration-300 ${hover ? "text-gold" : "text-bone/50"}`} />
          <div>
            <h3 className="font-display text-xl font-semibold text-bone">{service.title}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-bone/60">{service.body}</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-28">
      <div className="mb-12 max-w-lg">
        <h2 className="font-display text-4xl font-bold text-bone">
          Five services. One standard.
        </h2>
        <p className="mt-3 font-body text-bone/60">
          Move your cursor over a card — hover a photo to see the difference.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {SERVICES.map((s) => {
          if (s.before && s.after) return <PhotoCard key={s.id} service={s} />;
          if (s.image) return <ImageCard key={s.id} service={s} />;
          return <IconCard key={s.id} service={s} />;
        })}
      </div>
    </section>
  );
}
