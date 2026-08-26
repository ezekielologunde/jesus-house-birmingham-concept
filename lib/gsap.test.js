import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("gsap", () => {
  const gsap = {
    registerPlugin: vi.fn(),
    ticker: {
      add: vi.fn(),
      remove: vi.fn(),
      lagSmoothing: vi.fn(),
    },
  };
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

describe("syncScrollTriggerWithLenis", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns a disposer function that removes ticker callback", async () => {
    const { syncScrollTriggerWithLenis } = await import("./gsap.js");
    const mockLenis = { on: vi.fn() };
    const disposer = syncScrollTriggerWithLenis(mockLenis);

    expect(typeof disposer).toBe("function");
    disposer();
    const { gsap } = await import("gsap");
    expect(gsap.ticker.remove).toHaveBeenCalled();
  });
});
