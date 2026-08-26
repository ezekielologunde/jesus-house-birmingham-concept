import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminNewsletter from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoNewsletterSubscribers } from "@/lib/adminData";

describe("Admin newsletter page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("lists the demo subscribers", () => {
    render(<AdminNewsletter />);
    demoNewsletterSubscribers.forEach((s) => {
      expect(screen.getByText(new RegExp(s.email))).toBeInTheDocument();
    });
  });

  it("simulates a broadcast send with no real network delivery", async () => {
    render(<AdminNewsletter />);
    fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "Test body" } });
    fireEvent.click(screen.getByText(`Send to ${demoNewsletterSubscribers.length} subscribers`));

    await waitFor(() =>
      expect(
        screen.getByText("Thanks — this is a demo, so nothing was actually sent.")
      ).toBeInTheDocument()
    );
  });
});
