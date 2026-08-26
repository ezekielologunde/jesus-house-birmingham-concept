import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DirectionsSpotlight } from "./DirectionsSpotlight";
import { siteInfo } from "@/lib/content/siteInfo";

describe("DirectionsSpotlight", () => {
  it("shows the real address and phone number", () => {
    render(<DirectionsSpotlight />);
    expect(screen.getByText(siteInfo.address)).toBeInTheDocument();
    expect(screen.getByText(siteInfo.phone)).toBeInTheDocument();
  });

  it("links Get Directions to a real Google Maps directions URL for the church's address", () => {
    render(<DirectionsSpotlight />);
    const link = screen.getByText("Get Directions").closest("a");
    expect(link).toHaveAttribute(
      "href",
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteInfo.address)}`
    );
  });

  it("makes the phone number tap-to-call", () => {
    render(<DirectionsSpotlight />);
    expect(screen.getByText(siteInfo.phone).closest("a")).toHaveAttribute(
      "href",
      `tel:+1${siteInfo.phone.replace(/\D/g, "")}`
    );
  });
});
