import { describe, it, expect } from "vitest";
import { metadata } from "@/app/layout.jsx";

describe("root layout metadata", () => {
  it("has the real site title and an unofficial-concept description", () => {
    expect(metadata.title).toBe("Jesus House Birmingham | Unofficial Redesign Concept");
    expect(metadata.description.toLowerCase()).toContain("unofficial");
    expect(metadata.description).toContain("Jesus House Birmingham");
  });
});
