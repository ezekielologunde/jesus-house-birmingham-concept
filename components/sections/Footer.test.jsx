import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { routes, secondaryNavPaths } from "@/lib/content/routes";

const MORE_ROUTES = secondaryNavPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter(Boolean)
  .map((r) => [r.label, `/${r.path}`]);

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

  it.each(MORE_ROUTES)(
    "links to %s (routes left out of the primary nav) at %s",
    (label, href) => {
      render(<Footer />);
      expect(screen.getByText(label).closest("a")).toHaveAttribute("href", href);
    }
  );

  it("shows the unofficial-concept disclaimer with a link to the real site", () => {
    render(<Footer />);
    expect(screen.getByText(/unofficial/i)).toBeInTheDocument();
    expect(screen.getByText(/not affiliated with or endorsed by/i)).toBeInTheDocument();
    const realSiteLink = screen.getByText("jesushousebhm.org");
    expect(realSiteLink.closest("a")).toHaveAttribute("href", "https://www.jesushousebhm.org/");
  });
});
