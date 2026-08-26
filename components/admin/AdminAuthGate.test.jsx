import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminAuthGate } from "./AdminAuthGate";
import { setAdminAuthed } from "@/lib/adminAuth";
import { push, replace } from "@/tests/mocks/next-navigation";

describe("AdminAuthGate", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    push.mockClear();
    replace.mockClear();
  });

  it("renders children when authenticated", () => {
    setAdminAuthed(true);
    render(
      <AdminAuthGate>
        <p>protected content</p>
      </AdminAuthGate>
    );
    expect(screen.getByText("protected content")).toBeInTheDocument();
  });

  it("redirects to /admin and withholds children when not authenticated", () => {
    render(
      <AdminAuthGate>
        <p>protected content</p>
      </AdminAuthGate>
    );
    expect(screen.queryByText("protected content")).not.toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith("/admin");
  });
});
