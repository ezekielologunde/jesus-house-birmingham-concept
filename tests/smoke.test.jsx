import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Sanity() {
  return <p>toolchain ok</p>;
}

describe("test toolchain", () => {
  it("renders a component and queries text", () => {
    render(<Sanity />);
    expect(screen.getByText("toolchain ok")).toBeInTheDocument();
  });
});
