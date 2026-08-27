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
  { id: "yaya-week", name: "YAYA Week", month: 4, dateLabel: "April (annual)", description: "A week of programming for the young adults' ministry — worship, fellowship, and community." },
  { id: "mens-week", name: "Men's Week", month: 10, dateLabel: "October (annual)", description: "An annual week of men's fellowship, prayer, and programming." },
];

// A specific one-off special Sunday, sourced from the YAYA ministry's own
// flyer supplied by the site owner on 2026-08-26 — distinct from the annual
// programs above, since this one has a confirmed exact date and time
// instead of just a month.
export const upcomingEvents = [
  {
    id: "yaya-storytelling-sunday",
    name: "YAYA Storytelling Sunday",
    theme: "My Journey, Your Hope",
    verse: {
      text: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
      reference: "Matthew 5:16",
    },
    date: "2026-08-30",
    time: "10:00",
    dateLabel: "Sunday, August 30, 2026 · 10:00 AM",
    description: "Real Stories · Real Struggles · Real Faith · Real Hope.",
    dressCode: "Corporate outfit",
  },
];
