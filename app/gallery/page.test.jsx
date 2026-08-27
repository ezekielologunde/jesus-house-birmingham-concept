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

import Gallery from "./page";

describe("Gallery page", () => {
  it("shows photo tiles with captions", () => {
    render(<Gallery />);
    expect(screen.getByText("Sunday Worship")).toBeInTheDocument();
    expect(screen.getByText(/jesus house birmingham/i)).toBeInTheDocument();
  });

  it("renders an image for every tile", () => {
    render(<Gallery />);
    expect(screen.getAllByRole("img")).toHaveLength(8);
  });
});
