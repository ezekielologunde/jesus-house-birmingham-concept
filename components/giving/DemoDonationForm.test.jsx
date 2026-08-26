import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DemoDonationForm } from "./DemoDonationForm";

describe("DemoDonationForm", () => {
  it("defaults to the first preset amount", () => {
    render(<DemoDonationForm />);
    expect(screen.getByText("Simulate $25 Donation")).toBeInTheDocument();
  });

  it("switches the submit label when a different preset is chosen", () => {
    render(<DemoDonationForm />);
    fireEvent.click(screen.getByText("$100"));
    expect(screen.getByText("Simulate $100 Donation")).toBeInTheDocument();
  });

  it("uses a custom amount over the presets when entered", () => {
    render(<DemoDonationForm />);
    fireEvent.change(screen.getByLabelText("Custom amount"), { target: { value: "77" } });
    expect(screen.getByText("Simulate $77 Donation")).toBeInTheDocument();
  });

  it("simulates a donation with no real payment form and no real charge", async () => {
    render(<DemoDonationForm />);
    fireEvent.click(screen.getByText("Simulate $25 Donation"));

    await waitFor(() => expect(screen.getByText(/demo donation of \$25/i)).toBeInTheDocument());
    expect(screen.getByText(/no real donation was processed/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
  });

  it("lets the visitor try again after a simulated donation", async () => {
    render(<DemoDonationForm />);
    fireEvent.click(screen.getByText("Simulate $25 Donation"));
    await waitFor(() => expect(screen.getByText(/demo donation of \$25/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText("Try again"));
    expect(screen.getByText("Simulate $25 Donation")).toBeInTheDocument();
  });
});
