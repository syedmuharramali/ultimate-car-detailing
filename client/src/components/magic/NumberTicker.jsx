import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Number Ticker. Counts to `value` the first time it scrolls into
 * view. Renders the final value immediately when the viewer prefers reduced
 * motion, and always leaves a readable number in the DOM rather than a zero.
 */
export default function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 1200,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!inView || reduce) {
      setDisplay(value);
      return;
    }

    let raf;
    let start = null;
    setDisplay(0);

    function tick(now) {
      if (start === null) start = now;
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
