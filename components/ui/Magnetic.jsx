"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 };

export function Magnetic({ children, strength = 0.3, className, style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Motion values instead of useState: .set() drives the transform directly
  // through Framer Motion's own render loop, without going through React —
  // onMouseMove can fire dozens of times a second, and re-rendering this
  // subtree on every one of those was the actual jank.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  if (reduce) {
    return (
      <span className={className} style={{ display: "inline-flex", ...style }}>
        {children}
      </span>
    );
  }

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", x, y, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}
