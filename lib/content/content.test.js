import { describe, it, expect } from "vitest";
import { siteInfo } from "./siteInfo";
import { serviceTimes } from "./serviceTimes";
import { pastors, ministryLeads } from "./leadership";
import { ministries, ministriesArePlaceholder } from "./ministries";
import { recurringEvents, seasonalEvents, seasonalEventsArePlaceholder } from "./events";
import { givingMethods } from "./giving";
import { rccg } from "./rccg";

describe("siteInfo", () => {
  it("has the real name, tagline, and contact facts", () => {
    expect(siteInfo.name).toBe("Jesus House Birmingham");
    expect(siteInfo.tagline).toBe("Reviving Hope and Maximizing Potential");
    expect(siteInfo.address).toBe("213 1st Avenue North, Birmingham, Alabama 35204");
    expect(siteInfo.phone).toBe("(205) 201-4093");
    expect(siteInfo.email).toBe("secretary@jesushousebhm.org");
  });

  it("has the featured verse with its reference", () => {
    expect(siteInfo.verse.text).toBe("For with God nothing will be impossible");
    expect(siteInfo.verse.reference).toBe("Luke 1:37");
  });
});

describe("serviceTimes", () => {
  it("includes the real Sunday main service", () => {
    const main = serviceTimes.find((s) => s.label === "Main Service");
    expect(main.day).toBe("Sunday");
    expect(main.time).toBe("10:00 AM – 12:00 PM");
  });

  it("includes the real Wednesday Bible study", () => {
    const study = serviceTimes.find((s) => s.label === "Bible Study");
    expect(study.day).toBe("Wednesday");
    expect(study.time).toBe("6:00 PM – 7:30 PM");
  });
});

describe("leadership", () => {
  it("has the real lead pastor and co-pastor", () => {
    expect(pastors).toContainEqual(expect.objectContaining({ name: "Enefaa Fenny", title: "Lead Pastor" }));
    expect(pastors).toContainEqual(expect.objectContaining({ name: "Bola Fenny", title: "Co-Pastor" }));
  });

  it("has all 7 real ministry leads", () => {
    expect(ministryLeads).toHaveLength(7);
    expect(ministryLeads.map((m) => m.name)).toContain("Blessing Falola");
  });
});

describe("ministries", () => {
  it("still has some placeholder content", () => {
    expect(ministriesArePlaceholder).toBe(true);
    expect(ministries.length).toBeGreaterThan(0);
  });

  it("uses the real Kingdom Men and YAYA names, sourced from internal ministry chats", () => {
    expect(ministries.find((m) => m.id === "mens").name).toBe("Kingdom Men");
    expect(ministries.find((m) => m.id === "youth").name).toBe("YAYA (Youths & Young Adults)");
  });
});

describe("events", () => {
  it("derives recurring events from the real service times, not invented ones", () => {
    expect(recurringEvents.some((e) => e.name.includes("Main Service"))).toBe(true);
  });

  it("has the 2 real annual programs, not invented placeholder events", () => {
    expect(seasonalEventsArePlaceholder).toBe(false);
    expect(seasonalEvents.find((e) => e.id === "mens-week").dateLabel).toContain("October");
    expect(seasonalEvents.find((e) => e.id === "yaya-week").dateLabel).toContain("April");
  });
});

describe("giving", () => {
  it("has the real Zelle and text-to-give methods, sourced from the church's own signage", () => {
    const zelle = givingMethods.find((m) => m.name === "Zelle");
    expect(zelle.detail).toContain("205-586-9854");

    const textToGive = givingMethods.find((m) => m.name === "Text-to-Give");
    expect(textToGive.detail).toContain("(833) 271-1840");
  });

  it("links Give Online to the church's real domain, not a form on this site", () => {
    const online = givingMethods.find((m) => m.name === "Give Online");
    expect(online.href).toBe("https://www.jesushousebhm.org/giving");
  });

  it("does not include a QR-code based method, since none are generated for this build", () => {
    expect(givingMethods.some((m) => m.name.toLowerCase().includes("qr"))).toBe(false);
  });
});

describe("rccg", () => {
  it("has the real worldwide and North America headquarters", () => {
    expect(rccg.generalOverseer).toBe("Pastor E.A. Adeboye");
    expect(rccg.worldwideHq.address).toContain("Mowe, Ogun State, Nigeria");
    expect(rccg.northAmericaHq.address).toContain("Greenville, TX");
    expect(rccg.northAmericaOverseer).toBe("Pastor James Fadel");
  });

  it("has both real universities, Nigeria and North America", () => {
    const run = rccg.universities.find((u) => u.name === "Redeemer's University");
    expect(run.location).toBe("Ede, Osun State, Nigeria");

    const runa = rccg.universities.find((u) => u.name === "Redeemer's University North America");
    expect(runa.location).toContain("Texas");
  });

  it("describes the camp development's planned housing estate with a link, not a purchase flow", () => {
    expect(rccg.campDevelopment.note.toLowerCase()).toContain("housing estate");
    expect(rccg.campDevelopment.url).toBe("https://campdevelopment.rccgna.org");
  });
});
