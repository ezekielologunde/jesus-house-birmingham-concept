import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLogin from "./page";
import { isAdminAuthed, setAdminAuthed } from "@/lib/adminAuth";
import { push, replace } from "@/tests/mocks/next-navigation";

describe("Admin login page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    push.mockClear();
    replace.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects an incorrect password", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: false, json: () => Promise.resolve({ error: "Incorrect password." }) })
      )
    );
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() => expect(screen.getByText("Incorrect password.")).toBeInTheDocument());
    expect(isAdminAuthed()).toBe(false);
  });

  it("posts the password to /api/admin/login and redirects to the dashboard on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }))
    );
    render(<AdminLogin />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "correct-password" } });
    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("/api/admin/login");
    expect(JSON.parse(options.body)).toEqual({ password: "correct-password" });

    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin/dashboard"));
    expect(isAdminAuthed()).toBe(true);
  });

  it("redirects straight to the dashboard when already authenticated", () => {
    setAdminAuthed(true);
    render(<AdminLogin />);
    expect(replace).toHaveBeenCalledWith("/admin/dashboard");
  });
});
