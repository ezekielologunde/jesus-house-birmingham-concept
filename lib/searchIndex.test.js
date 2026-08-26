import { describe, it, expect } from "vitest";
import { searchIndex, searchSite } from "./searchIndex";

describe("searchIndex", () => {
  it("returns no results for an empty query", () => {
    expect(searchSite("")).toEqual([]);
    expect(searchSite("   ")).toEqual([]);
  });

  it("matches by title", () => {
    const results = searchSite("giving");
    expect(results[0].href).toBe("/giving");
  });

  it("matches by description keyword", () => {
    const results = searchSite("mission");
    expect(results.some((r) => r.href === "/about")).toBe(true);
  });

  it("ranks a title match above a description-only match", () => {
    const results = searchSite("prayer");
    expect(results[0].href).toBe("/prayer");
  });

  it("returns nothing for a query with no matches", () => {
    expect(searchSite("zzznotarealpageatall")).toEqual([]);
  });

  it("has no admin routes in the public search index", () => {
    searchIndex.forEach((item) => {
      expect(item.href.startsWith("/admin")).toBe(false);
    });
  });
});
