import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a required error when submitted with no email", async () => {
    render(<NewsletterForm />);
    fireEvent.click(screen.getByText("Subscribe"));
    await waitFor(() => expect(screen.getByText("Email is required.")).toBeInTheDocument());
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits real subscriptions to /api/newsletter and shows a success message", async () => {
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "person@example.com" },
    });
    fireEvent.click(screen.getByText("Subscribe"));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("/api/newsletter");
    expect(JSON.parse(options.body)).toEqual({ email: "person@example.com" });

    await waitFor(() => expect(screen.getByText(/you.re subscribed/i)).toBeInTheDocument());
  });
});
