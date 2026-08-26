"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { seasonalEvents } from "@/lib/content/events";

const DISMISS_PREFIX = "jhb-ann-dismissed-";

// Sets the --bar-h custom property so the fixed Nav header (top-[var(--bar-h)])
// and the page-content wrapper (padding-top: var(--bar-h)) shift down together
// while this bar is showing, without every page needing its own coordination.
export function AnnouncementBar() {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const remaining = seasonalEvents.filter(
      (e) => !window.localStorage.getItem(`${DISMISS_PREFIX}${e.id}`)
    );
    if (remaining.length) {
      setVisibleEvents(remaining);
      document.documentElement.style.setProperty("--bar-h", "44px");
    }
  }, []);

  useEffect(() => {
    if (visibleEvents.length < 2 || paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % visibleEvents.length);
    }, 6000);
    return () => clearInterval(id);
  }, [visibleEvents.length, paused]);

  function dismiss() {
    setDismissed(true);
    visibleEvents.forEach((e) => window.localStorage.setItem(`${DISMISS_PREFIX}${e.id}`, "1"));
    document.documentElement.style.setProperty("--bar-h", "0px");
  }

  if (dismissed || visibleEvents.length === 0) return null;

  const current = visibleEvents[index % visibleEvents.length];

  return (
    <div
      role="banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="fixed top-0 left-0 right-0 z-50 h-11 bg-ink flex items-center gap-3 px-6"
    >
      <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
      <span key={current.id} className="flex-1 min-w-0 flex items-center gap-3">
        <span className="font-body text-sm font-semibold text-ivory/90 truncate">
          {current.name} · {current.dateLabel}
        </span>
        <Link href="/events" className="font-body text-sm font-bold text-gold shrink-0 whitespace-nowrap">
          See events →
        </Link>
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="text-ivory/40 hover:text-ivory/70 text-lg leading-none shrink-0"
      >
        ×
      </button>
    </div>
  );
}
