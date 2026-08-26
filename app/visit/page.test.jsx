import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Visit from "./page";

describe("Visit page", () => {
  it("shows the real service times and address", () => {
    render(<Visit />);
    expect(screen.getByText("Main Service")).toBeInTheDocument();
    expect(screen.getByText("213 1st Avenue North, Birmingham, Alabama 35204")).toBeInTheDocument();
  });

  it("has a plan-a-visit form with a name field", () => {
    render(<Visit />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
});
