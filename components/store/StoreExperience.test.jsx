import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StoreExperience } from "./StoreExperience";

const PRODUCTS = [
  { id: "a", name: "Widget", priceCents: 1000, description: "A widget.", swatch: "from-flame to-royal" },
  { id: "b", name: "Gadget", priceCents: 2000, description: "A gadget.", swatch: "from-gold to-flame" },
];

describe("StoreExperience", () => {
  it("lists every product with its price", () => {
    render(<StoreExperience products={PRODUCTS} />);
    expect(screen.getByText("Widget")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("Gadget")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  it("shows no cart until an item is added", () => {
    render(<StoreExperience products={PRODUCTS} />);
    expect(screen.queryByText(/^Cart/)).not.toBeInTheDocument();
  });

  it("adds an item to the cart and totals it", () => {
    render(<StoreExperience products={PRODUCTS} />);
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    expect(screen.getByText("Cart (1)")).toBeInTheDocument();
    expect(screen.getByText("Widget × 1")).toBeInTheDocument();
  });

  it("adding the same product twice increments its quantity and total", () => {
    render(<StoreExperience products={PRODUCTS} />);
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    fireEvent.click(screen.getByText("Add another (1)"));
    expect(screen.getByText("Cart (2)")).toBeInTheDocument();
    expect(screen.getByText("Widget × 2")).toBeInTheDocument();
  });

  it("removes an item from the cart", () => {
    render(<StoreExperience products={PRODUCTS} />);
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    fireEvent.click(screen.getByText("Remove"));
    expect(screen.queryByText(/^Cart/)).not.toBeInTheDocument();
  });

  it("completes a simulated checkout with no real charge", async () => {
    render(<StoreExperience products={PRODUCTS} />);
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    fireEvent.click(screen.getByText("Checkout"));
    fireEvent.click(screen.getByText("Confirm Demo Order"));

    await waitFor(() => expect(screen.getByText("Demo Order Confirmed")).toBeInTheDocument());
    expect(screen.getByText(/no real charge was made/i)).toBeInTheDocument();
  });

  it("lets the shopper start a new demo order after confirming", async () => {
    render(<StoreExperience products={PRODUCTS} />);
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    fireEvent.click(screen.getByText("Checkout"));
    fireEvent.click(screen.getByText("Confirm Demo Order"));
    await waitFor(() => expect(screen.getByText("Demo Order Confirmed")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Start a New Demo Order"));
    expect(screen.getByText("Widget")).toBeInTheDocument();
    expect(screen.queryByText(/^Cart/)).not.toBeInTheDocument();
  });
});
