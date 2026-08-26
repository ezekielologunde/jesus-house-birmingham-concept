import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Testimonies from "./page";

const LEFT_CURLY_QUOTE = String.fromCharCode(8220);
const RIGHT_CURLY_QUOTE = String.fromCharCode(8221);
const quotePattern = new RegExp(`["${LEFT_CURLY_QUOTE}${RIGHT_CURLY_QUOTE}]`);

describe("Testimonies page", () => {
  it("invites visitors to share, without showing any invented quotes", () => {
    render(<Testimonies />);
    expect(screen.getByText(/Share Your Testimony/i)).toBeInTheDocument();
    expect(screen.queryByText(quotePattern)).not.toBeInTheDocument();
  });
});
