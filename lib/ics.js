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

// Builds a single (non-recurring) .ics event with a confirmed exact date
// and time — for one-off special services, as opposed to the month-only
// annual programs above where no specific day was ever confirmed.
// Floating local time (no TZID/UTC "Z"): simplest correct choice for a
// single-location in-person service, where every real invitee is already
// in the church's own timezone.
function icsDateTime(date) {
  return `${icsDate(date.getFullYear(), date.getMonth() + 1, date.getDate())}T${pad(
    date.getHours()
  )}${pad(date.getMinutes())}00`;
}

export function buildDateEventIcs({
  uid,
  title,
  description,
  dateISO,
  time,
  durationMinutes = 90,
  referenceDate,
}) {
  const [year, month, day] = dateISO.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const start = new Date(year, month - 1, day, hour, minute);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const stampSource = referenceDate ?? new Date();
  const stamp = `${icsDate(
    stampSource.getFullYear(),
    stampSource.getMonth() + 1,
    stampSource.getDate()
  )}T000000Z`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jesus House Birmingham (Unofficial Concept)//EN",
    "BEGIN:VEVENT",
    `UID:${uid}@jesushousebhm-concept`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDateTime(start)}`,
    `DTEND:${icsDateTime(end)}`,
    `SUMMARY:${title} (Jesus House Birmingham — unofficial concept)`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
