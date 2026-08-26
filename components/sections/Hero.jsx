"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { getGsap } from "@/lib/gsap";
import { Magnetic } from "@/components/ui/Magnetic";
import { siteInfo } from "@/lib/content/siteInfo";

const CTAS = [
  { label: "Worship With Us", href: "/visit" },
  { label: "Giving", href: "/giving" },
  { label: "Prayer Requests", href: "/prayer" },
];

export function Hero() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 16 })
        .from("[data-hero-word]", { opacity: 0, yPercent: 100, stagger: 0.06 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 12, stagger: 0.1 }, "-=0.4");
    }, scope);

    return () => ctx.revert();
  }, []);

  const words = siteInfo.tagline.split(" ");

  return (
    <section ref={scope} className="min-h-screen flex flex-col justify-center px-6 pt-24">
      <p data-hero-eyebrow className="font-body text-sm text-sanctuary mb-4">
        &ldquo;{siteInfo.verse.text}.&rdquo; — {siteInfo.verse.reference}
      </p>

      <h1 className="font-display text-5xl md:text-7xl text-ink max-w-4xl overflow-hidden">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} data-hero-word style={{ display: "inline-block" }}>
            {word}{i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      <div className="flex flex-wrap gap-4 mt-10">
        {CTAS.map((cta) => (
          <div key={cta.href} data-hero-cta>
            <Magnetic strength={0.2}>
              <Link
                href={cta.href}
                className="inline-block rounded-full bg-sanctuary text-ivory px-6 py-3 font-body font-semibold"
              >
                {cta.label}
              </Link>
            </Magnetic>
          </div>
        ))}
      </div>
    </section>
  );
}
