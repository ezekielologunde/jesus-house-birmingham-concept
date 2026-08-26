import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Ministries from "./page";
import { ministries } from "@/lib/content/ministries";

describe("Ministries page", () => {
  it("shows every ministry from the content module", () => {
    render(<Ministries />);
    ministries.forEach((m) => {
      expect(screen.getByText(m.name)).toBeInTheDocument();
    });
  });
});
