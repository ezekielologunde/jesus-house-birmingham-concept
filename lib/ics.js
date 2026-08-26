// Builds a downloadable .ics calendar file for an annual event known only
// to the month (not a specific day) — matches what's actually confirmed in
// lib/content/events.js. Rendered as a full-month all-day block rather than
// guessing a specific date, with the description saying so explicitly.
function pad(n) {
  return String(n).padStart(2, "0");
}

function icsDate(year, month, day) {
  return `${year}${pad(month)}${pad(day)}`;
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function nextOccurrenceYear(month, referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  return referenceDate.getMonth() + 1 > month ? year + 1 : year;
}

export function buildMonthEventIcs({ uid, title, month, description, referenceDate }) {
  const year = nextOccurrenceYear(month, referenceDate);
  const start = icsDate(year, month, 1);
  // DTEND for an all-day range is exclusive, so it's the day after the
  // month's last day.
  const lastDay = daysInMonth(year, month);
  const endDate = new Date(year, month - 1, lastDay);
  endDate.setDate(endDate.getDate() + 1);
  const end = icsDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());

  const stampSource = referenceDate ?? new Date();
  const stamp = `${icsDate(
    stampSource.getFullYear(),
    stampSource.getMonth() + 1,
    stampSource.getDate()
  )}T000000Z`;

  const fullDescription = `${description} Exact dates within the month aren't confirmed yet — check with the church directly.`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jesus House Birmingham (Unofficial Concept)//EN",
    "BEGIN:VEVENT",
    `UID:${uid}@jesushousebhm-concept`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    "RRULE:FREQ=YEARLY",
    `SUMMARY:${title} (Jesus House Birmingham — unofficial concept)`,
    `DESCRIPTION:${fullDescription}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
