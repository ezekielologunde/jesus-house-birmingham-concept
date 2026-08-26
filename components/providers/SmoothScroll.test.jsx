import { describe, it, expect, vi, beforeEach } from "vitest";
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
import { syncScrollTriggerWithLenis } from "@/lib/gsap";

describe("SmoothScroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders its children", () => {
    vi.mocked(syncScrollTriggerWithLenis).mockReturnValue(vi.fn());
    render(
      <SmoothScroll>
        <p>page content</p>
      </SmoothScroll>
    );
    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("calls the disposer returned by syncScrollTriggerWithLenis on unmount", () => {
    const removeTicker = vi.fn();
    vi.mocked(syncScrollTriggerWithLenis).mockReturnValue(removeTicker);
    const { unmount } = render(
      <SmoothScroll>
        <p>content</p>
      </SmoothScroll>
    );
    expect(removeTicker).not.toHaveBeenCalled();
    unmount();
    expect(removeTicker).toHaveBeenCalled();
    expect(destroy).toHaveBeenCalled();
  });
});
