import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";
import { routes, primaryNavPaths, secondaryNavPaths } from "@/lib/content/routes";

const PRIMARY_ROUTES = primaryNavPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter(Boolean)
  .map((r) => [r.label, `/${r.path}`]);

const SECONDARY_ROUTES = secondaryNavPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter(Boolean);

describe("Nav", () => {
  it.each(PRIMARY_ROUTES)("links to %s at %s", (label, href) => {
    render(<Nav />);
    const links = screen.getAllByText(label);
    expect(links.some((el) => el.closest("a")?.getAttribute("href") === href)).toBe(true);
  });

  it("keeps the primary nav to 8 items so it doesn't overflow at laptop widths", () => {
    expect(PRIMARY_ROUTES).toHaveLength(8);
  });

  it.each(SECONDARY_ROUTES.map((r) => [r.label]))(
    "leaves %s out of the primary nav (it's reachable via the footer instead)",
    (label) => {
      render(<Nav />);
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
  );

  it("shows the real church name as the wordmark", () => {
    render(<Nav />);
    expect(screen.getAllByText("Jesus House").length).toBeGreaterThan(0);
  });
});
