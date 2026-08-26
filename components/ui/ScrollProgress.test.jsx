import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

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

import { ScrollProgress } from "./ScrollProgress";

describe("ScrollProgress", () => {
  it("renders a progress bar element", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.querySelector('[data-testid="scroll-progress-bar"]')).toBeInTheDocument();
  });
});
