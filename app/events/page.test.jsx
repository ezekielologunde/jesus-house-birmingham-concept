import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Events from "./page";

describe("Events page", () => {
  it("shows the real recurring services", () => {
    render(<Events />);
    expect(screen.getByText(/Main Service \(Sunday\)/)).toBeInTheDocument();
  });

  it("shows the real annual Men's Week and YAYA Week programs", () => {
    render(<Events />);
    expect(screen.getByText("Men's Week")).toBeInTheDocument();
    expect(screen.getByText("YAYA Week")).toBeInTheDocument();
  });

  it("offers an Add to Calendar download for each annual program", () => {
    render(<Events />);
    expect(screen.getAllByText("Add to Calendar")).toHaveLength(2);
  });
});
