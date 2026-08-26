import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import { routes } from "@/lib/content/routes";

describe("sitemap", () => {
  it("includes every route from the shared routes module", () => {
    const entries = sitemap();
    const urls = entries.map((e) => new URL(e.url).pathname);
    routes.forEach((r) => {
      expect(urls).toContain(r.path ? `/${r.path}` : "/");
    });
  });

  it("has exactly as many entries as the shared routes module, no more and no less", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(routes.length);
  });
});
