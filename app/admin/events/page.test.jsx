import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminEvents from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoEvents } from "@/lib/adminData";

describe("Admin events page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("lists the demo events", () => {
    render(<AdminEvents />);
    demoEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
    });
  });
});
