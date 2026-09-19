import { motion } from "framer-motion";

/**
 * The one scroll-reveal used across the site, so every section enters the
 * same way. framer-motion's `whileInView` with `once` — the element animates
 * from a visible resting state rather than sitting at opacity 0 waiting on an
 * observer, so the page is readable even if JS is slow.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  as = "div",
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** Staggers its children by index — for card grids and step rows. */
export function RevealGroup({ children, className = "", stagger = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
