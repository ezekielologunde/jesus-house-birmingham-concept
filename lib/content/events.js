import { serviceTimes } from "./serviceTimes";

export const recurringEvents = serviceTimes.map((s) => ({
  id: s.id,
  name: `${s.label} (${s.day})`,
  day: s.day,
  time: s.time,
}));

// Real annual programs, sourced from internal ministry WhatsApp groups
// (Kingdom Men, YAYA JHB), read on 2026-08-26 — replacing what used to be
// invented placeholder seasonal events. No specific day-by-day agenda is
// asserted here since that wasn't confirmed beyond the month.
export const seasonalEventsArePlaceholder = false;

export const seasonalEvents = [
  { id: "yaya-week", name: "YAYA Week", dateLabel: "April (annual)", description: "A week of programming for the young adults' ministry — worship, fellowship, and community." },
  { id: "mens-week", name: "Men's Week", dateLabel: "October (annual)", description: "An annual week of men's fellowship, prayer, and programming." },
];
