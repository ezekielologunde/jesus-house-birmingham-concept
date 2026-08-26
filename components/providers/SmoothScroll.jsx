"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { syncScrollTriggerWithLenis } from "@/lib/gsap";

export function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    const removeTicker = syncScrollTriggerWithLenis(lenis);

    return () => {
      removeTicker();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
