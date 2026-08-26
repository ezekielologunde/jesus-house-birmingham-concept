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

  it("returns a disposer function that removes the exact ticker callback reference", async () => {
    const { syncScrollTriggerWithLenis } = await import("./gsap.js");
    const mockLenis = { on: vi.fn() };
    const disposer = syncScrollTriggerWithLenis(mockLenis);
    const { gsap } = await import("gsap");

    expect(typeof disposer).toBe("function");

    // Capture the exact function reference that was added to the ticker
    const addedFn = gsap.ticker.add.mock.calls[0][0];
    expect(addedFn).toBeDefined();

    // Call the disposer
    disposer();

    // Verify the SAME function reference was removed, not just any function
    expect(gsap.ticker.remove).toHaveBeenCalledWith(addedFn);
  });
});
