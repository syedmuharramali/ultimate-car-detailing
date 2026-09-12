import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/**
 * Wraps children in a card that tilts in 3D toward the cursor.
 * Not decoration for its own sake — this is meant for the service/gallery
 * cards, where "look closer" is literally what a detailer wants you to do.
 */
export default function TiltCard({ children, className = "", maxTilt = 8, glare = true }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(y, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 220, damping: 22, mass: 0.6 }
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 220, damping: 22, mass: 0.6 }
  );
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 55%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
