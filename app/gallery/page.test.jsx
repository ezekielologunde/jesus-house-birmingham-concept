import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Gallery from "./page";

describe("Gallery page", () => {
  it("shows placeholder tiles with captions, not real photography", () => {
    render(<Gallery />);
    expect(screen.getByText("Sunday Worship")).toBeInTheDocument();
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });
});
