import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Giving from "./page";

describe("Giving page", () => {
  it("shows the real Zelle and text-to-give details", () => {
    render(<Giving />);
    expect(screen.getByText(/205-586-9854/)).toBeInTheDocument();
    expect(screen.getByText(/\(833\) 271-1840/)).toBeInTheDocument();
  });

  it("links Give Online to the church's real giving page", () => {
    render(<Giving />);
    expect(screen.getByText("Give Online").closest("a")).toHaveAttribute(
      "href",
      "https://www.jesushousebhm.org/giving"
    );
  });

  it("tells visitors to confirm through the church's real site, since this isn't an official channel", () => {
    render(<Giving />);
    expect(screen.getByText(/not an official/i)).toBeInTheDocument();
  });
});
