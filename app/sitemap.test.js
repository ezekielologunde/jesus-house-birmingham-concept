import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

const ROUTES = [
  "/",
  "/about",
  "/leadership",
  "/visit",
  "/ministries",
  "/events",
  "/giving",
  "/gallery",
  "/testimonies",
  "/contact",
  "/prayer",
];

describe("sitemap", () => {
  it("includes all 11 public routes", () => {
    const entries = sitemap();
    const urls = entries.map((e) => new URL(e.url).pathname);
    ROUTES.forEach((route) => {
      expect(urls).toContain(route === "/" ? "/" : route);
    });
  });
});
