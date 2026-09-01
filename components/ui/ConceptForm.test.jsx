import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConceptForm } from "./ConceptForm";

describe("ConceptForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts field values to the given endpoint and shows the success message", async () => {
    render(
      <ConceptForm
        fields={[{ name: "email", required: true }]}
        endpoint="/api/example"
        submitLabel="Send"
        successMessage="Thanks — received."
      >
        <input name="email" defaultValue="person@example.com" />
      </ConceptForm>
    );

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("/api/example");
    expect(JSON.parse(options.body)).toEqual({ email: "person@example.com" });

    await waitFor(() => expect(screen.getByText("Thanks — received.")).toBeInTheDocument());
  });

  it("shows the server's error message and doesn't advance to success when the request fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Something went wrong." }),
    });

    render(
      <ConceptForm
        fields={[{ name: "email", required: true }]}
        endpoint="/api/example"
        submitLabel="Send"
        successMessage="Thanks — received."
      >
        <input name="email" defaultValue="person@example.com" />
      </ConceptForm>
    );

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => expect(screen.getByText("Something went wrong.")).toBeInTheDocument());
    expect(screen.queryByText("Thanks — received.")).not.toBeInTheDocument();
  });
});
