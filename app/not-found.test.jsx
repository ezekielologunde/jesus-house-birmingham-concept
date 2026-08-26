import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("Not found page", () => {
  it("tells the visitor the page doesn't exist and links home", () => {
    render(<NotFound />);
    expect(screen.getByText(/page/i)).toBeInTheDocument();
    expect(screen.getByText("Back to Home").closest("a")).toHaveAttribute("href", "/");
  });
});
