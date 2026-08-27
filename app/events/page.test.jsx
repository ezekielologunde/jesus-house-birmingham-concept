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

  it("offers an Add to Calendar download for each annual program and upcoming event", () => {
    render(<Events />);
    expect(screen.getAllByText("Add to Calendar")).toHaveLength(3);
  });

  it("shows the real upcoming YAYA Storytelling Sunday with its date and theme", () => {
    render(<Events />);
    expect(screen.getByText("YAYA Storytelling Sunday")).toBeInTheDocument();
    expect(screen.getByText(/August 30, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/My Journey, Your Hope/)).toBeInTheDocument();
  });
});
