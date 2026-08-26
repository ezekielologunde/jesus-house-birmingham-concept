import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminLogin from "./page";
import { ADMIN_DEMO_PASSWORD, isAdminAuthed, setAdminAuthed } from "@/lib/adminAuth";
import { push, replace } from "@/tests/mocks/next-navigation";

describe("Admin login page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    push.mockClear();
    replace.mockClear();
  });

  it("shows the demo password so the console is testable", () => {
    render(<AdminLogin />);
    expect(screen.getByText(ADMIN_DEMO_PASSWORD)).toBeInTheDocument();
  });

  it("rejects an incorrect password", () => {
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByText("Log In"));
    expect(screen.getByText("Incorrect password.")).toBeInTheDocument();
    expect(isAdminAuthed()).toBe(false);
  });

  it("accepts the demo password and redirects to the dashboard", () => {
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: ADMIN_DEMO_PASSWORD } });
    fireEvent.click(screen.getByText("Log In"));
    expect(isAdminAuthed()).toBe(true);
    expect(push).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("redirects straight to the dashboard when already authenticated", () => {
    setAdminAuthed(true);
    render(<AdminLogin />);
    expect(replace).toHaveBeenCalledWith("/admin/dashboard");
  });
});
