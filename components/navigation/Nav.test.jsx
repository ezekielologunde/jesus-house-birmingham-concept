import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";
import { routes } from "@/lib/content/routes";

const ROUTES = routes.map((r) => [r.label, `/${r.path}`]);

describe("Nav", () => {
  it.each(ROUTES)("links to %s at %s", (label, href) => {
    render(<Nav />);
    const links = screen.getAllByText(label);
    expect(links.some((el) => el.closest("a")?.getAttribute("href") === href)).toBe(true);
  });

  it("shows the real church name as the wordmark", () => {
    render(<Nav />);
    expect(screen.getAllByText("Jesus House").length).toBeGreaterThan(0);
  });
});
