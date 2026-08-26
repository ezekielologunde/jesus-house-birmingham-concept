import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Prayer from "./page";

describe("Prayer page", () => {
  it("has a prayer request form with a request field", () => {
    render(<Prayer />);
    expect(screen.getByLabelText("Prayer Request")).toBeInTheDocument();
  });

  it("is explicit that this demo does not deliver requests to the church", () => {
    render(<Prayer />);
    expect(screen.getByText(/does not reach the church/i)).toBeInTheDocument();
  });
});
