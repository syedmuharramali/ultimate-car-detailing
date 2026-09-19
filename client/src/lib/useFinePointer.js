import { useEffect, useState } from "react";

/**
 * True only on devices with a precise pointer (mouse/trackpad).
 *
 * Parallax and 3D tilt cost a composite every frame. On a phone there is no
 * cursor to track and the hero scrolls past in a single swipe, so that work
 * buys nothing and competes with image decoding for the same frame budget.
 * Gate those effects on this.
 */
export default function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return fine;
}
