"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function RevealText({ text, className, tag: Tag = "span" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll("[data-word]"), {
        yPercent: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word style={{ display: "inline-block" }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
