import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Testimonies from "./page";

describe("Testimonies page", () => {
  it("invites visitors to share, without showing any invented quotes", () => {
    render(<Testimonies />);
    expect(screen.getByText(/Share Your Testimony/i)).toBeInTheDocument();
    expect(screen.queryByText(/["""]/)).not.toBeInTheDocument();
  });
});
