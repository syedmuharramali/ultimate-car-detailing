import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/magic/Reveal.jsx";
import interiorBefore from "../assets/interior-before.webp";
import interiorAfter from "../assets/interior-after.webp";
import exteriorBefore from "../assets/exterior-before.webp";
import exteriorAfter from "../assets/exterior-after.webp";

const PAIRS = [
  {
    id: "exterior",
    label: "Exterior",
    before: exteriorBefore,
    after: exteriorAfter,
    beforeAlt: "Car exterior before detailing, dulled by road grime",
    afterAlt: "The same exterior after a hand wash and wax",
  },
  {
    id: "interior",
    label: "Interior",
    before: interiorBefore,
    after: interiorAfter,
    beforeAlt: "Car interior before detailing",
    afterAlt: "The same interior after a full clean and condition",
  },
];

/**
 * Drag-to-reveal before/after.
 *
 * The old service cards cross-faded on hover, which meant phone visitors —
 * most of the traffic for a local business — only ever saw the dirty car.
 * Pulling the handle is the thing a detailer actually sells, so the visitor
 * performs it themselves. Pointer, touch and keyboard all drive the same
 * range input, which is what carries the accessibility.
 */
export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const frameRef = useRef(null);
  const draggingRef = useRef(false);

  const setFromPointer = useCallback((clientX) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  function onPointerDown(e) {
    draggingRef.current = true;
    frameRef.current?.setPointerCapture?.(e.pointerId);
    setFromPointer(e.clientX);
  }
  function onPointerMove(e) {
    if (draggingRef.current) setFromPointer(e.clientX);
  }
  function endDrag(e) {
    draggingRef.current = false;
    if (e?.pointerId != null && frameRef.current?.hasPointerCapture?.(e.pointerId)) {
      frameRef.current.releasePointerCapture(e.pointerId);
    }
  }

  const pair = PAIRS[active];

  return (
    <section id="reveal" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal className="mb-10 flex max-w-xl flex-col gap-3.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          The difference
        </p>
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] text-bone sm:text-5xl">
          Drag it and see
          <br />
          for yourself.
        </h2>
        <p className="font-body text-[15px] leading-relaxed text-text-secondary">
          Real vehicles we detailed in the GTA — same car, same angle, same light.
          Pull the handle across.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="flex flex-col gap-4">
        <div role="tablist" aria-label="Choose a before and after" className="flex gap-2">
          {PAIRS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "h-9 rounded-full border px-4 font-mono text-xs tracking-wide transition-all duration-200",
                active === i
                  ? "border-accent bg-accent font-medium text-graphite"
                  : "border-border text-text-secondary hover:border-white/20 hover:text-bone"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ "--pos": `${pos}%` }}
          className={cn(
            "relative aspect-video w-full cursor-ew-resize overflow-hidden rounded-sm border border-border bg-panel",
            "touch-pan-y focus-within:outline focus-within:outline-2 focus-within:outline-offset-[3px] focus-within:outline-accent"
          )}
        >
          <img
            key={`${pair.id}-before`}
            src={pair.before}
            alt={pair.beforeAlt}
            decoding="async"
            className="absolute inset-0 h-full w-full select-none object-cover"
            draggable={false}
          />
          <img
            key={`${pair.id}-after`}
            src={pair.after}
            alt={pair.afterAlt}
            className="absolute inset-0 h-full w-full select-none object-cover"
            decoding="async"
            style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
            draggable={false}
          />

          <span className="pointer-events-none absolute bottom-3.5 left-3.5 rounded-full bg-graphite/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
            Before
          </span>
          <span className="pointer-events-none absolute bottom-3.5 right-3.5 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-graphite">
            After
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-px bg-bone shadow-[0_0_22px_rgba(0,0,0,0.55)]"
            style={{ left: "var(--pos)" }}
          >
            <motion.span
              animate={{ scale: draggingRef.current ? 0.94 : 1 }}
              className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-graphite shadow-[0_4px_22px_rgba(0,0,0,0.5)]"
            >
              <ChevronsLeftRight size={19} strokeWidth={2.2} />
            </motion.span>
          </div>

          {/* Carries keyboard and screen-reader support for the whole control. */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={pos}
            onChange={(e) => setPos(parseFloat(e.target.value))}
            aria-label={`Reveal the after photo — ${pair.label.toLowerCase()}`}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-wider text-bone/40">
          Drag the handle · or use the arrow keys
        </p>
      </Reveal>
    </section>
  );
}
