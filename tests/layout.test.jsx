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
    },
    ScrollTrigger: {},
  }),
  syncScrollTriggerWithLenis: vi.fn(() => vi.fn()),
}));

import RootLayout, { metadata } from "@/app/layout.jsx";

describe("root layout metadata", () => {
  it("has the real site title and an unofficial-concept description", () => {
    expect(metadata.title).toBe("Jesus House Birmingham | Unofficial Redesign Concept");
    expect(metadata.description.toLowerCase()).toContain("unofficial");
    expect(metadata.description).toContain("Jesus House Birmingham");
  });

  it("marks the site as non-indexable via metadata.robots", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

describe("RootLayout renders the required disclaimer", () => {
  it("includes the unofficial-concept disclaimer when rendering any page", () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>
    );
    expect(screen.getByText(/not affiliated with or endorsed by/i)).toBeInTheDocument();
  });
});
