import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./page";

describe("About page", () => {
  it("shows the real vision statement", () => {
    render(<About />);
    expect(
      screen.getByText(/To make heaven, to take as many people with us/)
    ).toBeInTheDocument();
  });

  it("links to the Leadership page (dropped from the primary nav)", () => {
    render(<About />);
    const link = screen.getByText(/Meet our Leadership Team/);
    expect(link.closest("a")).toHaveAttribute("href", "/leadership");
  });

  it("shows RCCG's real worldwide and North America headquarters", () => {
    render(<About />);
    expect(screen.getByText(/Mowe, Ogun State, Nigeria/)).toBeInTheDocument();
    expect(screen.getAllByText(/Greenville, TX/)).toHaveLength(2);
  });

  it("shows the real North America Continental Overseer", () => {
    render(<About />);
    expect(screen.getByText(/Pastor James Fadel/)).toBeInTheDocument();
  });

  it("shows both real RCCG universities", () => {
    render(<About />);
    expect(screen.getByText("Redeemer's University")).toBeInTheDocument();
    expect(screen.getByText("Redeemer's University North America")).toBeInTheDocument();
  });

  it("describes the camp development's planned housing estate as informational, with a link and no purchase CTA", () => {
    render(<About />);
    expect(screen.getByText(/housing estate/)).toBeInTheDocument();
    const link = screen.getByText("campdevelopment.rccgna.org");
    expect(link.closest("a")).toHaveAttribute("href", "https://campdevelopment.rccgna.org");
    expect(screen.queryByText(/buy|purchase/i)).not.toBeInTheDocument();
  });
});
