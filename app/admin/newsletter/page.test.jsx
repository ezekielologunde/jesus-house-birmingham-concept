import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminNewsletter from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";

const SUBSCRIBERS = [
  { id: "1", email: "ada@example.com", created_at: "2026-08-01T00:00:00Z" },
  { id: "2", email: "grace@example.com", created_at: "2026-08-02T00:00:00Z" },
];

describe("Admin newsletter page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ subscribers: SUBSCRIBERS }) })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists real subscribers", async () => {
    render(<AdminNewsletter />);
    await waitFor(() => expect(screen.getByText(/ada@example.com/)).toBeInTheDocument());
    expect(screen.getByText(/grace@example.com/)).toBeInTheDocument();
  });

  it("simulates a broadcast send with no real network delivery", async () => {
    render(<AdminNewsletter />);
    await waitFor(() => expect(screen.getByText(`Send to ${SUBSCRIBERS.length} subscribers`)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "Test body" } });
    fireEvent.click(screen.getByText(`Send to ${SUBSCRIBERS.length} subscribers`));

    await waitFor(() =>
      expect(
        screen.getByText("Thanks — this is a demo, so nothing was actually sent.")
      ).toBeInTheDocument()
    );
  });
});
