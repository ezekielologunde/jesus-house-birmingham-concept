import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the real address, phone, and email", () => {
    render(<Footer />);
    expect(screen.getByText("213 1st Avenue North, Birmingham, Alabama 35204")).toBeInTheDocument();
    expect(screen.getByText("(205) 201-4093")).toBeInTheDocument();
    expect(screen.getByText("secretary@jesushousebhm.org")).toBeInTheDocument();
  });

  it("makes the phone and email tap-to-call/email on mobile", () => {
    render(<Footer />);
    expect(screen.getByText("(205) 201-4093").closest("a")).toHaveAttribute(
      "href",
      "tel:+12052014093"
    );
    expect(screen.getByText("secretary@jesushousebhm.org").closest("a")).toHaveAttribute(
      "href",
      "mailto:secretary@jesushousebhm.org"
    );
  });

  it("shows the unofficial-concept disclaimer with a link to the real site", () => {
    render(<Footer />);
    expect(screen.getByText(/unofficial/i)).toBeInTheDocument();
    expect(screen.getByText(/not affiliated with or endorsed by/i)).toBeInTheDocument();
    const realSiteLink = screen.getByText("jesushousebhm.org");
    expect(realSiteLink.closest("a")).toHaveAttribute("href", "https://www.jesushousebhm.org/");
  });
});
