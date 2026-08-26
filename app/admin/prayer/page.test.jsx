import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import AdminPrayer from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoPrayerRequests } from "@/lib/adminData";

describe("Admin prayer requests page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("lists the demo prayer requests", () => {
    render(<AdminPrayer />);
    demoPrayerRequests.forEach((r) => {
      expect(screen.getByText(r.message)).toBeInTheDocument();
    });
  });

  it("toggles a request between unprayed and prayed-for", () => {
    render(<AdminPrayer />);
    const unprayed = demoPrayerRequests.find((r) => !r.prayedFor);
    const card = screen.getByText(unprayed.message).closest("li");
    const toggle = within(card).getByRole("button");
    expect(toggle).toHaveTextContent("Mark as prayed for");
    fireEvent.click(toggle);
    expect(toggle).toHaveTextContent("Prayed for");
  });
});
