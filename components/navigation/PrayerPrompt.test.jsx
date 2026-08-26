import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PrayerPrompt } from "./PrayerPrompt";

function renderWithFooter(footerTop = 10000) {
  const footer = document.createElement("footer");
  document.body.appendChild(footer);
  vi.spyOn(footer, "getBoundingClientRect").mockReturnValue({
    top: footerTop,
    bottom: footerTop + 200,
    left: 0,
    right: 0,
    width: 0,
    height: 200,
  });
  render(<PrayerPrompt />);
  return footer;
}

describe("PrayerPrompt", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("does not appear immediately", () => {
    renderWithFooter();
    expect(screen.queryByText("Need prayer?")).not.toBeInTheDocument();
  });

  it("appears after the delay, once, when the footer is far away", () => {
    renderWithFooter();
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.getByText("Need prayer?")).toBeInTheDocument();
  });

  it("does not appear again in the same session once dismissed", () => {
    window.sessionStorage.setItem("jhb-prayer-prompt-seen", "1");
    renderWithFooter();
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.queryByText("Need prayer?")).not.toBeInTheDocument();
  });

  it("closes when 'Not now' is clicked", () => {
    renderWithFooter();
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    fireEvent.click(screen.getByText("Not now"));
    expect(screen.queryByText("Need prayer?")).not.toBeInTheDocument();
  });

  it("links to the real Prayer page", () => {
    renderWithFooter();
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(screen.getByText("Send request").closest("a")).toHaveAttribute("href", "/prayer");
  });
});
