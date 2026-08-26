import { describe, it, expect, beforeEach } from "vitest";
import { ADMIN_DEMO_PASSWORD, isAdminAuthed, setAdminAuthed } from "./adminAuth";

describe("adminAuth", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("starts unauthenticated", () => {
    expect(isAdminAuthed()).toBe(false);
  });

  it("becomes authenticated after setAdminAuthed(true)", () => {
    setAdminAuthed(true);
    expect(isAdminAuthed()).toBe(true);
  });

  it("clears authentication after setAdminAuthed(false)", () => {
    setAdminAuthed(true);
    setAdminAuthed(false);
    expect(isAdminAuthed()).toBe(false);
  });

  it("has a non-empty demo password", () => {
    expect(typeof ADMIN_DEMO_PASSWORD).toBe("string");
    expect(ADMIN_DEMO_PASSWORD.length).toBeGreaterThan(0);
  });
});
