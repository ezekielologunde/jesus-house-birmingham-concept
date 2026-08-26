import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./page";

describe("Contact page", () => {
  it("shows the real phone and email", () => {
    render(<Contact />);
    expect(screen.getByText("(205) 201-4093")).toBeInTheDocument();
    expect(screen.getByText("secretary@jesushousebhm.org")).toBeInTheDocument();
  });

  it("makes the phone and email tap-to-call/email on mobile", () => {
    render(<Contact />);
    expect(screen.getByText("(205) 201-4093").closest("a")).toHaveAttribute(
      "href",
      "tel:+12052014093"
    );
    expect(screen.getByText("secretary@jesushousebhm.org").closest("a")).toHaveAttribute(
      "href",
      "mailto:secretary@jesushousebhm.org"
    );
  });

  it("has a contact form with a message field", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("embeds a map to the real address", () => {
    render(<Contact />);
    const map = screen.getByTitle("Map to Jesus House Birmingham");
    expect(map.tagName).toBe("IFRAME");
    expect(map).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("213 1st Avenue North, Birmingham, Alabama 35204"))
    );
  });
});
