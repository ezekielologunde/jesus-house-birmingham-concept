"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartHandshake, X } from "lucide-react";

const SESSION_KEY = "jhb-prayer-prompt-seen";
const DELAY_MS = 30000;

export function PrayerPrompt() {
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return undefined;
    const timer = setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Hide once the footer scrolls into the lower part of the viewport rather
  // than leaving this sitting on top of the footer's newsletter form/links
  // for the rest of the session.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return undefined;

    let throttleId = null;
    function check() {
      throttleId = null;
      const rect = footer.getBoundingClientRect();
      setNearFooter(rect.top < window.innerHeight * 0.6);
    }
    function onScroll() {
      if (throttleId) return;
      throttleId = setTimeout(check, 100);
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible || nearFooter) return null;

  return (
    <div
      role="complementary"
      aria-label="Prayer request"
      className="fixed bottom-6 right-6 z-40 w-[280px] bg-white rounded-2xl border border-ink/10 shadow-cta-hover p-5"
    >
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Close prayer prompt"
        className="absolute top-3 right-3 text-ink/40 hover:text-ink/70"
      >
        <X size={16} strokeWidth={2} />
      </button>
      <div className="w-10 h-10 rounded-lg bg-sky flex items-center justify-center mb-3">
        <HeartHandshake size={18} strokeWidth={2} className="text-royal" aria-hidden />
      </div>
      <p className="font-body font-bold text-sm text-ink mb-1.5">Need prayer?</p>
      <p className="font-body text-xs text-ink/60 leading-relaxed mb-4">
        Share your request and our prayer team will pray with you this week.
      </p>
      <div className="flex gap-2">
        <Link
          href="/prayer"
          onClick={() => setVisible(false)}
          className="flex-1 text-center bg-royal text-ivory font-body font-bold text-xs px-3.5 py-2.5 rounded-full"
        >
          Send request
        </Link>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="bg-ink/5 text-ink font-body font-semibold text-xs px-3.5 py-2.5 rounded-full"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
