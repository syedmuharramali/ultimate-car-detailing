import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import useFinePointer from "@/lib/useFinePointer.js";
import { Phone } from "lucide-react";
import ShimmerButton from "@/components/magic/ShimmerButton.jsx";
import { Button } from "@/components/ui/button";
import heroDesktop from "../assets/hero-desktop.webp";
import heroMobile from "../assets/hero-mobile.webp";

const PHONE = "647-492-2025";
const TEL = `tel:${PHONE.replace(/-/g, "")}`;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};
const rise = {
  hidden: { y: "108%" },
  show: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const FACTS = ["We come to you", "500+ vehicles detailed", "No payment to book"];

export default function Hero() {
  const sectionRef = useRef(null);
  // Parallax costs a composite per scroll frame. On a phone the hero is gone
  // in one swipe and that budget is better spent decoding images.
  const parallax = useFinePointer();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // The photograph drifts slower than the copy — the depth cue that makes a
  // flat hero read as a scene rather than a banner.
  const imageYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const copyYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const copyFadeRaw = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const imageY = parallax ? imageYRaw : undefined;
  const copyY = parallax ? copyYRaw : undefined;
  const copyFade = parallax ? copyFadeRaw : undefined;

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-border">
      <motion.div style={{ y: imageY }} className="pointer-events-none absolute inset-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(94deg,#0c0b0a_8%,rgba(12,11,10,0.88)_40%,rgba(12,11,10,0.18)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyFade }}
        className="relative mx-auto flex min-h-[clamp(430px,58vh,580px)] w-full max-w-6xl flex-col justify-center px-6 py-12 sm:py-16"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-[18px]">
          <motion.p
            variants={fade}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
          >
            Mobile detailing · GTA &amp; Surrounding Areas
          </motion.p>

          {/* Big Shoulders is condensed, so a 13ch measure lands this at three
              lines. A wider measure sends it to five and the hero swallows the
              whole viewport. */}
          <h1 className="max-w-[13ch] font-display text-[clamp(46px,8.6vw,88px)] font-extrabold uppercase leading-[0.92] tracking-[-0.018em] text-bone">
            <span className="block overflow-hidden">
              <motion.span variants={rise} className="block">
                Every detail
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={rise} className="block text-accent">
                makes the difference.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="max-w-[52ch] font-body text-[15px] leading-relaxed text-text-secondary"
          >
            We bring the detail shop to your driveway. Interior, exterior, wax, rims
            and tires — done properly, while you carry on with your day.
          </motion.p>

          <motion.div variants={fade} className="mt-1.5 flex flex-wrap items-center gap-3.5">
            <ShimmerButton as={Link} to="/contact">
              Book your detail
            </ShimmerButton>
            <Button asChild variant="subtle" size="lg">
              <a href={TEL}>
                <Phone size={16} className="text-accent" />
                {PHONE}
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fade}
            className="mt-1 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-bone/40"
          >
            {FACTS.map((f) => (
              <span key={f} className="inline-flex items-center gap-2">
                <i className="size-[5px] shrink-0 rounded-full bg-accent" />
                {f}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
