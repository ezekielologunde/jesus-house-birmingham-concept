import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      timeline: () => ({
        from: function () {
          return this;
        },
      }),
      matchMedia: () => ({ add: (query, fn) => fn(), revert: vi.fn() }),
    },
    ScrollTrigger: {},
  }),
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return { ...actual, useReducedMotion: vi.fn(() => false) };
});

import { useReducedMotion } from "framer-motion";
import { Hero } from "./Hero";

describe("Hero", () => {
  beforeEach(() => {
    useReducedMotion.mockReturnValue(false);
  });

  it("renders the real tagline and verse", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reviving Hope");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Maximizing Potential");
    expect(screen.getByText((content) => content.includes("For with God nothing will be impossible"))).toBeInTheDocument();
  });

  it("links its 3 CTAs to the right pages", () => {
    render(<Hero />);
    expect(screen.getByText("Worship With Us").closest("a")).toHaveAttribute("href", "/visit");
    expect(screen.getByText("Giving").closest("a")).toHaveAttribute("href", "/giving");
    expect(screen.getByText("Prayer Requests").closest("a")).toHaveAttribute("href", "/prayer");
  });

  it("renders a muted, autoplaying, looping background video with a poster fallback", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");
    expect(video).toBeTruthy();
    expect(video).toHaveAttribute("autoplay");
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("poster", "/gallery/worship.jpg");
    expect(container.querySelector("video source")).toHaveAttribute("src", "/video/hero-worship.mp4");
  });

  it("falls back to a static poster image when the visitor prefers reduced motion", () => {
    useReducedMotion.mockReturnValue(true);
    const { container } = render(<Hero />);
    expect(container.querySelector("video")).not.toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute("src", "/gallery/worship.jpg");
  });
});
