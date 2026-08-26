import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminAnnouncements from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoAnnouncements } from "@/lib/adminData";

describe("Admin announcements page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("lists the demo announcements", () => {
    render(<AdminAnnouncements />);
    demoAnnouncements.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
