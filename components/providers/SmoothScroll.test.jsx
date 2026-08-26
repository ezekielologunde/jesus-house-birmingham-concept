import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const destroy = vi.fn();
const raf = vi.fn();
vi.mock("lenis", () => ({
  default: vi.fn().mockImplementation(() => ({ raf, destroy, on: vi.fn() })),
}));
vi.mock("@/lib/gsap", () => ({
  syncScrollTriggerWithLenis: vi.fn(),
}));

import { SmoothScroll } from "./SmoothScroll";

describe("SmoothScroll", () => {
  it("renders its children", () => {
    render(
      <SmoothScroll>
        <p>page content</p>
      </SmoothScroll>
    );
    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
