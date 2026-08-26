import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Error from "./error";

describe("Error boundary", () => {
  it("tells the visitor something went wrong and offers a way back home", () => {
    render(<Error error={new Error("boom")} reset={() => {}} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText("Back to Home").closest("a")).toHaveAttribute("href", "/");
  });

  it("calls reset() when Try Again is clicked", () => {
    const reset = vi.fn();
    render(<Error error={new Error("boom")} reset={reset} />);
    fireEvent.click(screen.getByText("Try Again"));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
