import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VisionStatement } from "./VisionStatement";
import { siteInfo } from "@/lib/content/siteInfo";

describe("VisionStatement", () => {
  it("shows the real vision statement", () => {
    render(<VisionStatement />);
    expect(screen.getByText(siteInfo.vision)).toBeInTheDocument();
  });
});
