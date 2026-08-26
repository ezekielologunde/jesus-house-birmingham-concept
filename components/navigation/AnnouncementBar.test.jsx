import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AnnouncementBar } from "./AnnouncementBar";
import { seasonalEvents } from "@/lib/content/events";

describe("AnnouncementBar", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.style.removeProperty("--bar-h");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the first undismissed seasonal event", () => {
    render(<AnnouncementBar />);
    expect(
      screen.getByText(`${seasonalEvents[0].name} · ${seasonalEvents[0].dateLabel}`)
    ).toBeInTheDocument();
  });

  it("sets --bar-h so the header and page content shift down", () => {
    render(<AnnouncementBar />);
    expect(document.documentElement.style.getPropertyValue("--bar-h")).toBe("44px");
  });

  it("dismisses and clears --bar-h, remembering the dismissal", () => {
    render(<AnnouncementBar />);
    fireEvent.click(screen.getByLabelText("Dismiss announcement"));
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(document.documentElement.style.getPropertyValue("--bar-h")).toBe("0px");
    seasonalEvents.forEach((e) => {
      expect(window.localStorage.getItem(`jhb-ann-dismissed-${e.id}`)).toBe("1");
    });
  });

  it("does not render again once every event has been dismissed", () => {
    seasonalEvents.forEach((e) => {
      window.localStorage.setItem(`jhb-ann-dismissed-${e.id}`, "1");
    });
    render(<AnnouncementBar />);
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  it("rotates to the next event over time", () => {
    vi.useFakeTimers();
    render(<AnnouncementBar />);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(
      screen.getByText(`${seasonalEvents[1].name} · ${seasonalEvents[1].dateLabel}`)
    ).toBeInTheDocument();
  });
});
