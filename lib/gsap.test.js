import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("gsap", () => {
  const gsap = { registerPlugin: vi.fn() };
  return { gsap, default: gsap };
});
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { update: vi.fn() },
}));

describe("getGsap", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("registers ScrollTrigger exactly once even when called twice", async () => {
    const { getGsap } = await import("./gsap.js");
    const { gsap } = getGsap();
    getGsap();
    expect(gsap.registerPlugin).toHaveBeenCalledTimes(1);
  });

  it("returns the same ScrollTrigger reference passed to registerPlugin", async () => {
    const { getGsap } = await import("./gsap.js");
    const { gsap, ScrollTrigger } = getGsap();
    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
  });
});
