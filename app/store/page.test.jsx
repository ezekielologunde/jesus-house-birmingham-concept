import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Store from "./page";
import { storeProducts } from "@/lib/content/store";

describe("Store page", () => {
  it("shows the demo disclaimer and every product", () => {
    render(<Store />);
    expect(screen.getByText(/no real charge is ever made/i)).toBeInTheDocument();
    storeProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
