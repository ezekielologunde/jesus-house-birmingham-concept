import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Leadership from "./page";

describe("Leadership page", () => {
  it("shows the real lead pastor and co-pastor with their titles", () => {
    render(<Leadership />);
    expect(screen.getByText("Enefaa Fenny")).toBeInTheDocument();
    expect(screen.getByText("Lead Pastor")).toBeInTheDocument();
    expect(screen.getByText("Bola Fenny")).toBeInTheDocument();
    expect(screen.getByText("Co-Pastor")).toBeInTheDocument();
  });

  it("shows all 7 real ministry leads", () => {
    render(<Leadership />);
    expect(screen.getByText("Taiye Atilola")).toBeInTheDocument();
  });
});
