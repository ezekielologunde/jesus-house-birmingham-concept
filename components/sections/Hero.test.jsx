import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      timeline: () => ({
        from: function () {
          return this;
        },
      }),
      matchMedia: () => ({ add: (query, fn) => fn(), revert: vi.fn() }),
    },
    ScrollTrigger: {},
  }),
}));

import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the real tagline and verse", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reviving Hope");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Maximizing Potential");
    expect(screen.getByText((content) => content.includes("For with God nothing will be impossible"))).toBeInTheDocument();
  });

  it("links its 3 CTAs to the right pages", () => {
    render(<Hero />);
    expect(screen.getByText("Worship With Us").closest("a")).toHaveAttribute("href", "/visit");
    expect(screen.getByText("Giving").closest("a")).toHaveAttribute("href", "/giving");
    expect(screen.getByText("Prayer Requests").closest("a")).toHaveAttribute("href", "/prayer");
  });
});
