import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Magnetic } from "./Magnetic";

describe("Magnetic", () => {
  it("renders its children", () => {
    render(
      <Magnetic>
        <button type="button">Click me</button>
      </Magnetic>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
