"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function Parallax({ children, speed = 0.3, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(ref.current, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, ref);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
