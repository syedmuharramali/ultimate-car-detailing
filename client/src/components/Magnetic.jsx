import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

function useMagnetic(strength = 0.25) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.4 });

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

export function MagneticButton({ children, className = "", ...props }) {
  const m = useMagnetic();
  return (
    <motion.button
      ref={m.ref}
      style={m.style}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function MagneticAnchor({ children, className = "", ...props }) {
  const m = useMagnetic();
  return (
    <motion.a
      ref={m.ref}
      style={m.style}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function MagneticLink({ children, className = "", to, ...props }) {
  const m = useMagnetic();
  return (
    <MotionLink
      to={to}
      ref={m.ref}
      style={m.style}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
