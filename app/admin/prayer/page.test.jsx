import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import AdminPrayer from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";

const REQUESTS = [
  { id: "1", name: "Ada", request: "For healing", prayed_for: false, created_at: "2026-08-01T00:00:00Z" },
  { id: "2", name: "Grace", request: "For a new job", prayed_for: true, created_at: "2026-08-02T00:00:00Z" },
];

describe("Admin prayer requests page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
    vi.stubGlobal(
      "fetch",
      vi.fn((url) => {
        if (url === "/api/admin/prayer") {
          return Promise.resolve({ ok: true, json: () => Promise.resolve({ requests: REQUESTS }) });
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists real prayer requests", async () => {
    render(<AdminPrayer />);
    await waitFor(() => expect(screen.getByText("For healing")).toBeInTheDocument());
    expect(screen.getByText("For a new job")).toBeInTheDocument();
  });

  it("toggles a request between unprayed and prayed-for via the real API", async () => {
    render(<AdminPrayer />);
    await waitFor(() => expect(screen.getByText("For healing")).toBeInTheDocument());

    const card = screen.getByText("For healing").closest("li");
    const toggle = within(card).getByRole("button");
    expect(toggle).toHaveTextContent("Mark as prayed for");

    fireEvent.click(toggle);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/admin/prayer/1",
        expect.objectContaining({ method: "PATCH" })
      )
    );
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
    render(<AdminPrayer />);
    await waitFor(() =>
      expect(screen.getByText("SUPABASE_SERVICE_ROLE_KEY isn't set yet.")).toBeInTheDocument()
    );
  });
});
