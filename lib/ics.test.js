import { describe, it, expect } from "vitest";
import { nextOccurrenceYear, buildMonthEventIcs, buildDateEventIcs } from "./ics";

describe("nextOccurrenceYear", () => {
  it("stays in the current year when the target month hasn't happened yet", () => {
    expect(nextOccurrenceYear(4, new Date(2026, 0, 15))).toBe(2026); // Jan -> April
  });

  it("stays in the current year while inside the target month", () => {
    expect(nextOccurrenceYear(4, new Date(2026, 3, 15))).toBe(2026); // April -> April
  });

  it("rolls over to next year once the target month has passed", () => {
    expect(nextOccurrenceYear(4, new Date(2026, 5, 15))).toBe(2027); // June -> April
  });
});

describe("buildMonthEventIcs", () => {
  const ics = buildMonthEventIcs({
    uid: "yaya-week",
    title: "YAYA Week",
    month: 4,
    description: "A week of programming for the young adults' ministry.",
    referenceDate: new Date(2026, 0, 1),
  });

  it("is a well-formed VCALENDAR/VEVENT block", () => {
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("spans the full month as an all-day event, not a specific invented day", () => {
    expect(ics).toContain("DTSTART;VALUE=DATE:20260401");
    expect(ics).toContain("DTEND;VALUE=DATE:20260501");
  });

  it("recurs yearly and says explicitly that exact dates aren't confirmed", () => {
    expect(ics).toContain("RRULE:FREQ=YEARLY");
    expect(ics).toContain("aren't confirmed yet");
  });

  it("handles December correctly (year rollover in the end date)", () => {
    const decIcs = buildMonthEventIcs({
      uid: "test-dec",
      title: "Test",
      month: 12,
      description: "Test event.",
      referenceDate: new Date(2026, 0, 1),
    });
    expect(decIcs).toContain("DTSTART;VALUE=DATE:20261201");
    expect(decIcs).toContain("DTEND;VALUE=DATE:20270101");
  });
});

describe("buildDateEventIcs", () => {
  const ics = buildDateEventIcs({
    uid: "yaya-storytelling-sunday",
    title: "YAYA Storytelling Sunday",
    description: "Real Stories · Real Struggles · Real Faith · Real Hope.",
    dateISO: "2026-08-30",
    time: "10:00",
    referenceDate: new Date(2026, 7, 26),
  });

  it("is a well-formed VCALENDAR/VEVENT block", () => {
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("uses the confirmed exact date and time, not an all-day/recurring block", () => {
    expect(ics).toContain("DTSTART:20260830T100000");
    expect(ics).not.toContain("VALUE=DATE");
    expect(ics).not.toContain("RRULE");
  });

  it("defaults to a 90-minute duration for the end time", () => {
    expect(ics).toContain("DTEND:20260830T113000");
  });
});
