import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Prayer from "./page";

describe("Prayer page", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("has a prayer request form with a request field", () => {
    render(<Prayer />);
    expect(screen.getByLabelText("Prayer Request")).toBeInTheDocument();
  });

  it("submits real requests to /api/prayer with the entered name and request", async () => {
    render(<Prayer />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText("Prayer Request"), { target: { value: "For healing" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit Request" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("/api/prayer");
    expect(JSON.parse(options.body)).toEqual({ name: "Ada", request: "For healing" });

    await waitFor(() => expect(screen.getByText(/request has been received/i)).toBeInTheDocument());
  });
});
