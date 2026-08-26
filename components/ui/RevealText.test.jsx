import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      from: vi.fn(),
      matchMedia: () => ({ add: (query, fn) => fn(), revert: vi.fn() }),
    },
    ScrollTrigger: {},
  }),
}));

import { RevealText } from "./RevealText";

describe("RevealText", () => {
  it("renders the full text content", () => {
    render(<RevealText text="Reviving Hope and Maximizing Potential" />);
    expect(screen.getByText(/Reviving/)).toBeInTheDocument();
    expect(screen.getByText(/Potential/)).toBeInTheDocument();
  });
});
