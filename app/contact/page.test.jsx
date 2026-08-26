import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./page";

describe("Contact page", () => {
  it("shows the real phone and email", () => {
    render(<Contact />);
    expect(screen.getByText("(205) 201-4093")).toBeInTheDocument();
    expect(screen.getByText("secretary@jesushousebhm.org")).toBeInTheDocument();
  });

  it("has a contact form with a message field", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
