import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { EngagementOverlays } from "./EngagementOverlays";
import { mockPathname } from "@/tests/mocks/next-navigation";
import { seasonalEvents } from "@/lib/content/events";

describe("EngagementOverlays", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("renders the announcement bar on public pages", () => {
    mockPathname.current = "/";
    render(<EngagementOverlays />);
    expect(
      screen.getByText(`${seasonalEvents[0].name} · ${seasonalEvents[0].dateLabel}`)
    ).toBeInTheDocument();
  });

  it("renders nothing on admin pages", () => {
    mockPathname.current = "/admin/dashboard";
    const { container } = render(<EngagementOverlays />);
    expect(container).toBeEmptyDOMElement();
  });
});
