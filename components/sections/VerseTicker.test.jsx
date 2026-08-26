import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      to: vi.fn(),
      matchMedia: () => ({ add: (query, fn) => fn(), revert: vi.fn() }),
    },
    ScrollTrigger: {},
  }),
}));

import { VerseTicker } from "./VerseTicker";

describe("VerseTicker", () => {
  it("renders the real featured verse and its reference", () => {
    render(<VerseTicker />);
    expect(screen.getAllByText(/For with God nothing will be impossible/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Luke 1:37/).length).toBeGreaterThan(0);
  });
});
