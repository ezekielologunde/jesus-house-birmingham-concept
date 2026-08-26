"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";
import { siteInfo } from "@/lib/content/siteInfo";

const REPEATS = 4;

export function VerseTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    // An infinite marquee is a WCAG 2.2.2 (Pause, Stop, Hide) concern for
    // motion lasting longer than 5 seconds — skip it entirely under reduced
    // motion rather than just slowing it down, so the verse just sits still.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }, trackRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const verseLabel = `${siteInfo.verse.text} — ${siteInfo.verse.reference}`;

  return (
    <div className="overflow-hidden bg-royal text-ivory py-4">
      <div ref={trackRef} className="flex w-max whitespace-nowrap font-display text-lg">
        {Array.from({ length: REPEATS }).map((_, i) => (
          <span key={i} className="pr-12">{verseLabel}</span>
        ))}
      </div>
    </div>
  );
}
