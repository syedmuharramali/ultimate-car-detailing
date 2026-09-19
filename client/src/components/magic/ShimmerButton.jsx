import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Wrapping a component with motion() creates a NEW component type each time it
 * is called. Done inside render, React sees a different type on every pass and
 * remounts the subtree — on the booking form that meant the submit button
 * remounting on every keystroke. Cached at module scope, so each element type
 * is wrapped exactly once for the life of the page.
 */
const motionCache = new Map();
function asMotion(Comp) {
  if (typeof Comp === "string" && motion[Comp]) return motion[Comp];
  if (!motionCache.has(Comp)) {
    motionCache.set(Comp, motion.create ? motion.create(Comp) : motion(Comp));
  }
  return motionCache.get(Comp);
}

/**
 * Magic UI — Shimmer Button, themed to the Ember palette.
 * A band of light crosses the face on a slow loop, the way a work lamp travels
 * over fresh wax. Renders as whatever element you pass via `as` (Link, a,
 * button) so it works for routes, tel: links and submits alike.
 */
export default function ShimmerButton({
  as: Comp = "button",
  className = "",
  children,
  ...props
}) {
  const Motion = asMotion(Comp);

  return (
    <Motion
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "group relative inline-flex h-13 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-8",
        "font-body text-sm font-semibold text-graphite",
        "shadow-[0_10px_34px_-8px_var(--color-accent)] transition-colors duration-300",
        "hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-graphite",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-8 left-0 w-10 -translate-x-[140%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent animate-sweep"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Motion>
  );
}
