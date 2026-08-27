"use client";

import { buildMonthEventIcs, buildDateEventIcs } from "@/lib/ics";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AddToCalendarButton({ title, month, date, time, description }) {
  function handleClick() {
    const ics = date
      ? buildDateEventIcs({ uid: slugify(title), title, dateISO: date, time, description })
      : buildMonthEventIcs({ uid: slugify(title), title, month, description });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(title)}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-royal underline decoration-royal/40 hover:decoration-royal transition-colors duration-200"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 6.5h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      Add to Calendar
    </button>
  );
}
