"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { getGsap } from "@/lib/gsap";
import { Magnetic } from "@/components/ui/Magnetic";
import { siteInfo } from "@/lib/content/siteInfo";

const CTAS = [
  { label: "Worship With Us", href: "/visit" },
  { label: "Giving", href: "/giving" },
  { label: "Prayer Requests", href: "/prayer" },
];

// Open-license (Pexels) stock worship video by Luis Quintero — not real
// footage of Jesus House Birmingham. "Free to use" license, no attribution
// required, credited here anyway. https://www.pexels.com/video/19087710/
const HERO_VIDEO_SRC = "/video/hero-worship.mp4";
const HERO_VIDEO_POSTER = "/gallery/worship.jpg";

export function Hero() {
  const scope = useRef(null);
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Belt-and-suspenders for autoplay: the `autoPlay` attribute alone is
  // ignored in some contexts (in-app browsers, power-saving modes) even
  // when muted. Explicitly calling play() catches more of those cases; if
  // the browser still blocks it, the poster frame stays visible instead.
  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;
    video.play()?.catch(() => {});
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
          .from("[data-hero-eyebrow]", { opacity: 0, y: 16 })
          .from("[data-hero-word]", { opacity: 0, yPercent: 100, stagger: 0.06 }, "-=0.5")
          .from("[data-hero-cta]", { opacity: 0, y: 12, stagger: 0.1 }, "-=0.4");
      }, scope);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const words = siteInfo.tagline.split(" ");

  return (
    <section
      ref={scope}
      className="relative min-h-[80vh] flex flex-col justify-end px-6 pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0">
        {reduceMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={HERO_VIDEO_POSTER} alt="" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            poster={HERO_VIDEO_POSTER}
            className="w-full h-full object-cover"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
        {/* Flat, fairly opaque scrim (not a gradient) so text stays legible
            regardless of how bright a given video frame gets — verified
            against this clip's brightest (colored stage-light) moments. */}
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="relative">
        <p data-hero-eyebrow className="font-body text-sm text-gold mb-4">
          &ldquo;{siteInfo.verse.text}.&rdquo; — {siteInfo.verse.reference}
        </p>

        <h1 className="font-display text-5xl md:text-7xl tracking-tight text-ivory max-w-4xl overflow-hidden">
          {words.flatMap((word, i) => [
            <span key={`${word}-${i}`} data-hero-word style={{ display: "inline-block" }}>
              {word}
            </span>,
            i < words.length - 1 ? " " : "",
          ])}
        </h1>

        <div className="flex flex-wrap gap-4 mt-10">
          {CTAS.map((cta) => (
            <div key={cta.href} data-hero-cta>
              <Magnetic strength={0.2}>
                <Link
                  href={cta.href}
                  className="inline-block rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200"
                >
                  {cta.label}
                </Link>
              </Magnetic>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
