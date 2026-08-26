import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Visit from "./page";

describe("Visit page", () => {
  it("shows the real service times and address", () => {
    render(<Visit />);
    expect(screen.getByText("Main Service")).toBeInTheDocument();
    expect(screen.getByText("213 1st Avenue North, Birmingham, Alabama 35204")).toBeInTheDocument();
  });

  it("numbers the service times 01 through 03", () => {
    render(<Visit />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText(/Sunday.*10:00 AM – 12:00 PM/)).toBeInTheDocument();
  });

  it("has a plan-a-visit form with a name field", () => {
    render(<Visit />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("has a What to Expect FAQ that answers with real, sourced facts (not invented ones)", () => {
    render(<Visit />);
    expect(screen.getByText("What to Expect")).toBeInTheDocument();

    const lengthButton = screen
      .getByText("What time is the Main Service, and how long does it run?")
      .closest("button");
    fireEvent.click(lengthButton);
    expect(screen.getByText(/Rhema Expression starts the morning at 9:00 AM/)).toBeInTheDocument();

    const officialButton = screen
      .getByText("Is this Jesus House Birmingham's official website?")
      .closest("button");
    fireEvent.click(officialButton);
    expect(screen.getByText(/unofficial redesign concept/)).toBeInTheDocument();
  });
});
