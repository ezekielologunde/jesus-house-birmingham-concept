import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminGallery from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoGalleryItems } from "@/lib/adminData";

describe("Admin gallery page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("lists the demo gallery items", () => {
    render(<AdminGallery />);
    demoGalleryItems.forEach((item) => {
      expect(screen.getByText(item.caption)).toBeInTheDocument();
    });
  });
});
