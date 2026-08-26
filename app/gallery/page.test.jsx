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
}));

import Gallery from "./page";

describe("Gallery page", () => {
  it("shows placeholder tiles with captions, not real photography", () => {
    render(<Gallery />);
    expect(screen.getByText("Sunday Worship")).toBeInTheDocument();
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });
});
