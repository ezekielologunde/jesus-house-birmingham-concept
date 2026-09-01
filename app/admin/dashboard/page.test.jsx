import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AdminDashboard from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoEvents, demoAnnouncements, demoGalleryItems, demoBlogPosts } from "@/lib/adminData";

describe("Admin dashboard page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
    vi.stubGlobal(
      "fetch",
      vi.fn((url) => {
        if (url === "/api/admin/prayer") {
          return Promise.resolve({ ok: true, json: () => Promise.resolve({ requests: [{}, {}] }) });
        }
        if (url === "/api/admin/contact") {
          return Promise.resolve({ ok: true, json: () => Promise.resolve({ messages: [{}] }) });
        }
        if (url === "/api/admin/newsletter") {
          return Promise.resolve({ ok: true, json: () => Promise.resolve({ subscribers: [{}, {}, {}] }) });
        }
        return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows real counts for prayer requests, messages, and subscribers", async () => {
    render(<AdminDashboard />);
    await waitFor(() => expect(screen.getByText("Prayer Requests").closest("a")).toHaveTextContent("2"));
    expect(screen.getByText("Messages").closest("a")).toHaveTextContent("1");
    expect(screen.getByText("Newsletter Subscribers").closest("a")).toHaveTextContent("3");
  });

  it("still shows demo counts for the resources that aren't real yet", () => {
    render(<AdminDashboard />);
    const cards = [
      ["Events", demoEvents.length],
      ["Announcements", demoAnnouncements.length],
      ["Gallery Photos", demoGalleryItems.length],
      ["Blog Posts", demoBlogPosts.length],
    ];
    cards.forEach(([label, count]) => {
      const link = screen.getByText(label).closest("a");
      expect(link).toHaveTextContent(String(count));
      expect(link).toHaveTextContent("(demo)");
    });
  });
});
