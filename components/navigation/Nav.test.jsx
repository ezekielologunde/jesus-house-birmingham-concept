import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Nav } from "./Nav";
import { routes, primaryNavPaths, secondaryNavPaths } from "@/lib/content/routes";
import { brandVariants } from "@/lib/content/branding";

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

  it("shows one of the church's real name/logo variants as the wordmark", () => {
    render(<Nav />);
    const shown = brandVariants.some((v) => screen.queryAllByText(v.name).length > 0);
    expect(shown).toBe(true);
  });

  describe("mobile slide-in menu", () => {
    afterEach(() => {
      document.body.style.overflow = "";
    });

    it("opens the panel and locks body scroll when the menu button is clicked", () => {
      render(<Nav />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText("Open menu"));

      expect(screen.getByRole("dialog", { name: "Site menu" })).toBeInTheDocument();
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("closes the panel and restores body scroll when the close button is clicked", () => {
      render(<Nav />);
      fireEvent.click(screen.getByLabelText("Open menu"));
      fireEvent.click(screen.getByLabelText("Close menu"));

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
    });

    it("closes the panel when the Escape key is pressed", () => {
      render(<Nav />);
      fireEvent.click(screen.getByLabelText("Open menu"));
      fireEvent.keyDown(window, { key: "Escape" });

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes the panel when a link inside it is clicked", () => {
      render(<Nav />);
      fireEvent.click(screen.getByLabelText("Open menu"));

      const dialog = screen.getByRole("dialog");
      const [firstLink] = PRIMARY_ROUTES;
      fireEvent.click(
        within(dialog)
          .getAllByText(firstLink[0])
          .find((el) => el.closest("a"))
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
