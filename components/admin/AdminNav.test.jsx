import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminNav } from "./AdminNav";
import { setAdminAuthed, isAdminAuthed } from "@/lib/adminAuth";
import { push, mockPathname } from "@/tests/mocks/next-navigation";

describe("AdminNav", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    push.mockClear();
    mockPathname.current = "/admin/dashboard";
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders links to every admin section", () => {
    render(<AdminNav />);
    ["Dashboard", "Events", "Announcements", "Gallery", "Blog", "Prayer Requests", "Newsletter"].forEach(
      (label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    );
  });

  it("renders nothing on the login page", () => {
    mockPathname.current = "/admin";
    const { container } = render(<AdminNav />);
    expect(container).toBeEmptyDOMElement();
  });

  it("logs out and returns to the login page", () => {
    setAdminAuthed(true);
    render(<AdminNav />);
    fireEvent.click(screen.getByText("Log out"));
    expect(isAdminAuthed()).toBe(false);
    expect(push).toHaveBeenCalledWith("/admin");
  });
});
