import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqAccordion } from "./FaqAccordion";

const ITEMS = [
  { id: "a", question: "First question?", answer: "First answer." },
  { id: "b", question: "Second question?", answer: "Second answer." },
];

function panelFor(question) {
  return screen.getByText(question).closest("button");
}

describe("FaqAccordion", () => {
  it("starts with every panel collapsed by default", () => {
    render(<FaqAccordion items={ITEMS} />);
    expect(panelFor("First question?")).toHaveAttribute("aria-expanded", "false");
    expect(panelFor("Second question?")).toHaveAttribute("aria-expanded", "false");
  });

  it("expands a panel when its question is clicked, and collapses it again on a second click", () => {
    render(<FaqAccordion items={ITEMS} />);
    const button = panelFor("First question?");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("only keeps one panel expanded at a time", () => {
    render(<FaqAccordion items={ITEMS} />);
    fireEvent.click(panelFor("First question?"));
    expect(panelFor("First question?")).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(panelFor("Second question?"));
    expect(panelFor("Second question?")).toHaveAttribute("aria-expanded", "true");
    expect(panelFor("First question?")).toHaveAttribute("aria-expanded", "false");
  });

  it("hides a collapsed panel from assistive tech via aria-hidden", () => {
    render(<FaqAccordion items={ITEMS} />);
    expect(screen.getByText("First answer.").closest("[aria-hidden]")).toHaveAttribute(
      "aria-hidden",
      "true"
    );

    fireEvent.click(panelFor("First question?"));
    expect(screen.getByText("First answer.").closest("[aria-hidden]")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
  });
});
