import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminContact from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";

describe("Admin contact messages page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists real contact messages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              messages: [
                { id: "1", name: "Ada", email: "ada@example.com", message: "Hello there", created_at: "2026-08-01T00:00:00Z" },
              ],
            }),
        })
      )
    );
    render(<AdminContact />);
    await waitFor(() => expect(screen.getByText("Hello there")).toBeInTheDocument());
    expect(screen.getByText(/ada@example.com/)).toBeInTheDocument();
  });

  it("shows a clear notice when the service_role key isn't configured yet", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 503,
          json: () => Promise.resolve({ error: "SUPABASE_SERVICE_ROLE_KEY isn't set yet." }),
        })
      )
    );
    render(<AdminContact />);
    await waitFor(() =>
      expect(screen.getByText("SUPABASE_SERVICE_ROLE_KEY isn't set yet.")).toBeInTheDocument()
    );
  });
});
