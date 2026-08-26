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
      to: vi.fn(),
    },
    ScrollTrigger: { create: vi.fn() },
  }),
}));

import Home from "./page";

describe("Home page", () => {
  it("shows the real service times", () => {
    render(<Home />);
    expect(screen.getByText("Main Service")).toBeInTheDocument();
    expect(screen.getAllByText("10:00 AM – 12:00 PM").length).toBeGreaterThan(0);
  });

  it("shows a ministries preview linking to the full ministries page", () => {
    render(<Home />);
    expect(screen.getByText("Children's Church")).toBeInTheDocument();
    expect(screen.getByText("See all ministries").closest("a")).toHaveAttribute("href", "/ministries");
  });

  it("shows an events preview linking to the full events page", () => {
    render(<Home />);
    expect(screen.getByText("See all events").closest("a")).toHaveAttribute("href", "/events");
  });
});
