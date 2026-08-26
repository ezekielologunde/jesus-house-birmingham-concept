import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NumberedList } from "./NumberedList";

const ITEMS = [
  { id: "a", title: "First Item", description: "First detail" },
  { id: "b", title: "Second Item", description: "Second detail" },
  { id: "c", title: "Third Item", description: "Third detail" },
];

describe("NumberedList", () => {
  it("numbers each item sequentially, zero-padded", () => {
    render(<NumberedList items={ITEMS} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("shows every item's title and description", () => {
    render(<NumberedList items={ITEMS} />);
    ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
