"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function ScrollProgress({ className }) {
  const barRef = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(barRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div className={className ?? "fixed top-0 left-0 right-0 h-1 z-50"}>
      <div
        ref={barRef}
        data-testid="scroll-progress-bar"
        className="h-full origin-left bg-royal"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
