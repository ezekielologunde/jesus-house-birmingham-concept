import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      matchMedia: () => ({ add: (query, fn) => fn(), revert: vi.fn() }),
    },
    ScrollTrigger: { create: vi.fn() },
  }),
}));

import { PinSection } from "./PinSection";

describe("PinSection", () => {
  it("renders its children", () => {
    render(
      <PinSection>
        <p>pinned content</p>
      </PinSection>
    );
    expect(screen.getByText("pinned content")).toBeInTheDocument();
  });
});
