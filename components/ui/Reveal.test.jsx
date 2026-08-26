import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>hello reveal</p>
      </Reveal>
    );
    expect(screen.getByText("hello reveal")).toBeInTheDocument();
  });

  it("applies a passed className to the wrapper", () => {
    render(
      <Reveal className="test-class">
        <span>content</span>
      </Reveal>
    );
    expect(screen.getByText("content").parentElement).toHaveClass("test-class");
  });
});
