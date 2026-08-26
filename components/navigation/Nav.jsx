"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { LogoMark } from "@/components/ui/LogoMark";
import { SearchModal } from "@/components/navigation/SearchModal";
import { routes, primaryNavPaths } from "@/lib/content/routes";

const LINKS = primaryNavPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter(Boolean)
  .map((r) => ({ label: r.label, href: `/${r.path}` }));

export function Nav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-[var(--bar-h,0px)] left-0 right-0 z-40 bg-ivory/90 backdrop-blur border-b border-ink/10">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark className="w-8 h-8 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="hidden lg:block font-body text-[0.65rem] leading-tight tracking-[0.03em] text-royal uppercase mb-1 max-w-[11rem]">
                Redeemed Christian Church of God
              </span>
              <span className="font-display text-2xl text-royal">Jesus House</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-3">
            <nav className="hidden md:flex items-center gap-6 mr-2">
              {LINKS.map((link) => (
                <Magnetic key={link.href} strength={0.25}>
                  <Link href={link.href} className="font-body text-sm text-ink hover:text-royal">
                    {link.label}
                  </Link>
                </Magnetic>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 rounded-full text-ink hover:bg-ink/5 transition-colors duration-200 flex items-center gap-1.5"
            >
              <Search size={18} strokeWidth={2} aria-hidden />
              <kbd className="hidden lg:inline-block font-body text-[10px] font-bold text-ink/40 bg-ink/5 border border-ink/10 rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              className="md:hidden font-body text-sm py-2 px-1"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Backdrop and panel live outside <header> — header's backdrop-blur
          (a CSS filter) establishes a containing block for any
          position:fixed descendant, which would size/position these against
          header's own small box instead of the viewport. They also stay
          mounted (opacity/transform only) instead of mounting on open — an
          animate-out-then-unmount approach never resolves under jsdom, which
          has no real compositor to signal animation completion. */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-full sm:w-[380px] flex flex-col bg-gradient-to-br from-flame to-gold overflow-y-auto transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* flame and gold are both lighter than they look (high luminance
            despite reading as bold/saturated), so white text laid straight
            on the gradient fails contrast — this scrim darkens the whole
            panel by a flat amount so header text and every link clear WCAG
            AA regardless of where they sit in the gradient. */}
        <div className="absolute inset-0 bg-ink/55 pointer-events-none" />

        <div className="relative flex items-center justify-between px-6 py-5">
          <span className="flex items-center gap-2.5">
            <LogoMark className="w-7 h-7 shrink-0" outer="text-white" inner="text-white/55" />
            <span className="font-display text-xl text-white">Jesus House</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="relative flex flex-col gap-2 px-6 py-2">
          {LINKS.map((link, i) => (
            <div
              key={link.href}
              className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block px-5 py-4 text-lg font-body font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
