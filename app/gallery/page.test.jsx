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
  it("shows stock photo tiles with captions, disclaiming real church photography", () => {
    render(<Gallery />);
    expect(screen.getByText("Sunday Worship")).toBeInTheDocument();
    expect(screen.getByText(/stock photo/i)).toBeInTheDocument();
    expect(screen.getByText(/not actual photos of jesus house birmingham/i)).toBeInTheDocument();
  });

  it("renders an image for every tile", () => {
    render(<Gallery />);
    expect(screen.getAllByRole("img")).toHaveLength(6);
  });
});
