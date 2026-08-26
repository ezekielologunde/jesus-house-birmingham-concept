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

import { Parallax } from "./Parallax";

describe("Parallax", () => {
  it("renders its children", () => {
    render(
      <Parallax>
        <img alt="hero" src="/hero.jpg" />
      </Parallax>
    );
    expect(screen.getByAltText("hero")).toBeInTheDocument();
  });
});
