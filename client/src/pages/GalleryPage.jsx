import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard.jsx";
import interiorBefore from "../assets/interior-before.webp";
import interiorAfter from "../assets/interior-after.webp";
import exteriorBefore from "../assets/exterior-before.webp";
import exteriorAfter from "../assets/exterior-after.webp";
import galleryFinish from "../assets/gallery-finish-02.webp";
import interiorFinished from "../assets/interior-finished.webp";
import tireShine from "../assets/service-tire-shine.webp";
import detailer from "../assets/professional-detailer.webp";

const BEFORE_AFTER = [
  { label: "Exterior", before: exteriorBefore, after: exteriorAfter },
  { label: "Interior", before: interiorBefore, after: interiorAfter },
];

const FINISHED = [
  { src: galleryFinish, caption: "Finished exterior, ready to hand back" },
  { src: interiorFinished, caption: "Interior, fully reset" },
  { src: tireShine, caption: "Tire shine, up close" },
  { src: detailer, caption: "Inspected under work light before we call it done" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gold">Our work</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-bone sm:text-6xl">See the difference.</h1>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BEFORE_AFTER.map((pair) => (
            <div key={pair.label} className="overflow-hidden rounded-sm border border-white/10">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={pair.before} alt={`${pair.label} before`} className="h-64 w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-graphite/80 px-2.5 py-1 font-body text-xs uppercase tracking-wider text-bone/80">Before</span>
                </div>
                <div className="relative">
                  <img src={pair.after} alt={`${pair.label} after`} className="h-64 w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-gold px-2.5 py-1 font-body text-xs uppercase tracking-wider text-graphite">After</span>
                </div>
              </div>
              <div className="bg-panel px-4 py-3 font-display text-sm font-semibold text-bone">{pair.label} detailing</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 font-display text-3xl font-bold text-bone">From recent jobs</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINISHED.map((item) => (
              <TiltCard key={item.caption} className="overflow-hidden rounded-sm border border-white/10" maxTilt={8}>
                <figure>
                  <img src={item.src} alt={item.caption} className="h-56 w-full object-cover" />
                  <figcaption className="bg-graphite px-3 py-2.5 font-body text-xs text-bone/55">
                    {item.caption}
                  </figcaption>
                </figure>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
