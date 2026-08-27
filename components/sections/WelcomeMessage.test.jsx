import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WelcomeMessage } from "./WelcomeMessage";
import { siteInfo } from "@/lib/content/siteInfo";

describe("WelcomeMessage", () => {
  it("shows the real core message with both pastors' photo and attribution", () => {
    render(<WelcomeMessage />);
    expect(screen.getByText(`${siteInfo.coreMessage}.`)).toBeInTheDocument();
    expect(screen.getByText(/Pastors Enefaa & Bola Fenny/)).toBeInTheDocument();
    expect(screen.getByAltText(/Enefaa Fenny and Bola Fenny/)).toBeInTheDocument();
  });
});
