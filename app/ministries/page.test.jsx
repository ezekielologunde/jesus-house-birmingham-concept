import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      from: vi.fn(),
    },
    ScrollTrigger: {},
  }),
}));

import Ministries from "./page";
import { ministries } from "@/lib/content/ministries";

describe("Ministries page", () => {
  it("shows every ministry from the content module", () => {
    render(<Ministries />);
    ministries.forEach((m) => {
      expect(screen.getByText(m.name)).toBeInTheDocument();
    });
  });
});
