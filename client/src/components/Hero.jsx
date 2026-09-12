import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Phone } from "lucide-react";
import { MagneticLink, MagneticAnchor } from "./Magnetic.jsx";
import heroDesktop from "../assets/hero-desktop.webp";
import heroMobile from "../assets/hero-mobile.webp";

const PHONE = "647-492-2025";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const line = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // subtle mouse-tracked 3D tilt on the headline block
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <motion.div style={{ y: imageY }} className="pointer-events-none absolute inset-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/10 md:from-graphite md:via-graphite/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, rotateX, rotateY, transformPerspective: 1200 }}
        className="relative mx-auto w-full max-w-6xl px-6"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <div className="mb-6 overflow-hidden">
            <motion.p variants={fade} className="font-body text-sm uppercase tracking-[0.3em] text-gold">
              Mobile detailing &middot; GTA &amp; Surrounding Areas
            </motion.p>
          </div>

          <h1 className="font-display text-6xl font-bold leading-[0.95] text-bone sm:text-7xl">
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">Every detail</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">makes the</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block text-gold">difference.</motion.span>
            </span>
          </h1>

          <motion.p variants={fade} className="mt-6 max-w-md font-body text-base leading-relaxed text-bone/75">
            We bring premium car detailing straight to your driveway.
            Interior, exterior, wax and shine — done right, without you
            lifting a finger.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticLink
              to="/contact"
              className="rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-graphite"
            >
              Book your detail
            </MagneticLink>
            <MagneticAnchor
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="flex items-center gap-2 font-body text-sm text-bone/80 hover:text-bone"
            >
              <Phone size={16} className="text-gold" />
              {PHONE}
            </MagneticAnchor>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
