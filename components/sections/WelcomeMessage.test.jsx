import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WelcomeMessage } from "./WelcomeMessage";
import { siteInfo } from "@/lib/content/siteInfo";

describe("WelcomeMessage", () => {
  it("shows the real core message with the lead pastor's photo and attribution", () => {
    render(<WelcomeMessage />);
    expect(screen.getByText(`${siteInfo.coreMessage}.`)).toBeInTheDocument();
    expect(screen.getByText(/Enefaa Fenny, Lead Pastor/)).toBeInTheDocument();
    expect(screen.getByAltText(/Enefaa Fenny/)).toBeInTheDocument();
  });
});
