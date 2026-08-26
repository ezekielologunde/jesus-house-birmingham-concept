import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminBlog from "./page";
import { setAdminAuthed } from "@/lib/adminAuth";
import { demoBlogPosts } from "@/lib/adminData";

describe("Admin blog page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setAdminAuthed(true);
  });

  it("lists the demo blog posts", () => {
    render(<AdminBlog />);
    demoBlogPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});
