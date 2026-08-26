"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function PinSection({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
        });
      }, ref);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
