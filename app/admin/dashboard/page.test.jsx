import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import {
  demoEvents,
  demoAnnouncements,
  demoGalleryItems,
  demoBlogPosts,
  demoPrayerRequests,
  demoNewsletterSubscribers,
} from "@/lib/adminData";

describe("Admin dashboard page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("shows a count card for every resource matching the seed data", () => {
    render(<AdminDashboard />);
    const cards = [
      ["Events", demoEvents.length],
      ["Announcements", demoAnnouncements.length],
      ["Gallery Photos", demoGalleryItems.length],
      ["Blog Posts", demoBlogPosts.length],
      ["Prayer Requests", demoPrayerRequests.length],
      ["Newsletter Subscribers", demoNewsletterSubscribers.length],
    ];
    cards.forEach(([label, count]) => {
      const link = screen.getByText(label).closest("a");
      expect(link).toHaveTextContent(String(count));
    });
  });
});
