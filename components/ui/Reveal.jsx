"use client";

import { motion, useReducedMotion } from "framer-motion";

const OFFSETS = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.94 },
};

export function Reveal({ children, delay = 0, from = "up", className, style }) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[from] ?? OFFSETS.up;

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0, scale: offset.scale ?? 1 };

  return (
    <motion.div
      className={className}
      style={style}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.3 : 0.85,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
