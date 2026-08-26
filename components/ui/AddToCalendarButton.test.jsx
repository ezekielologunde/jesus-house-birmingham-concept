import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddToCalendarButton } from "./AddToCalendarButton";

describe("AddToCalendarButton", () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("builds a .ics blob and triggers a download with a sensible filename, on click", () => {
    let clickedLink = null;
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function mockClick() {
        clickedLink = this;
      });

    render(<AddToCalendarButton title="YAYA Week" month={4} description="A week of programming." />);
    fireEvent.click(screen.getByText("Add to Calendar"));

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    const [blobArg] = global.URL.createObjectURL.mock.calls[0];
    expect(blobArg.type).toBe("text/calendar;charset=utf-8");
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(clickedLink.download).toBe("yaya-week.ics");
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
  });
});
