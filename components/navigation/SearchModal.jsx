"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { searchSite } from "@/lib/searchIndex";

const HINTS = ["Visit", "Giving", "Events", "Prayer", "Store", "Ministries"];

export function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();
  const results = searchSite(query);

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        return;
      }
      if (event.key === "Enter" && results[active]) {
        router.push(results[active].href);
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, results, active, onClose, router]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  return (
    <>
      <div
        role="presentation"
        onClick={onClose}
        className="fixed inset-0 z-[300] bg-ink/60 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-label="Site search"
        aria-modal="true"
        className="fixed top-[14vh] left-1/2 -translate-x-1/2 z-[301] w-[min(560px,calc(100vw-32px))] bg-ivory rounded-2xl shadow-cta-hover border border-ink/10 overflow-hidden"
      >
        <div
          className={`flex items-center gap-3 px-4 py-3.5 ${
            results.length > 0 ? "border-b border-ink/10" : ""
          }`}
        >
          <Search size={18} className="text-ink/50 shrink-0" strokeWidth={2} aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages…"
            aria-label="Search the site"
            className="flex-1 min-w-0 bg-transparent outline-none font-body text-base text-ink placeholder:text-ink/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="p-1 text-ink/50 hover:text-ink shrink-0"
            >
              <X size={16} strokeWidth={2} />
            </button>
          ) : (
            <kbd className="font-body text-[11px] font-bold text-ink/50 bg-ink/5 border border-ink/10 rounded px-1.5 py-0.5 shrink-0">
              Esc
            </kbd>
          )}
        </div>

        {results.length > 0 ? (
          <ul role="listbox" className="max-h-[400px] overflow-y-auto p-2">
            {results.map((item, i) => (
              <li key={item.href} role="option" aria-selected={i === active}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.href);
                    onClose();
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg no-underline transition-colors duration-150 ${
                    i === active ? "bg-sky" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-sm text-ink truncate">{item.title}</p>
                    <p className="font-body text-xs text-ink/50 truncate">{item.description}</p>
                  </div>
                  <ArrowRight size={14} className="text-ink/40 shrink-0" strokeWidth={2.5} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {query.trim().length > 0 && results.length === 0 ? (
          <div className="px-5 py-7 text-center font-body text-sm text-ink/50">
            No results for &ldquo;{query}&rdquo;
          </div>
        ) : null}

        {!query ? (
          <div className="px-4 py-4 flex flex-wrap gap-2">
            <span className="font-body text-[11px] font-bold tracking-[0.1em] uppercase text-ink/40 w-full mb-1">
              Quick links
            </span>
            {HINTS.map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => setQuery(hint)}
                className="font-body text-sm font-semibold text-ink/70 bg-ink/5 border border-ink/10 rounded-full px-3.5 py-1.5 hover:bg-ink/10 transition-colors duration-150"
              >
                {hint}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
