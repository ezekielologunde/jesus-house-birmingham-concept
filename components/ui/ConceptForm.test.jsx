import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConceptForm } from "./ConceptForm";

describe("ConceptForm", () => {
  it("shows the success message after a valid submit, with no real delivery", async () => {
    render(
      <ConceptForm
        fields={[{ name: "email", required: true }]}
        submitLabel="Send"
        successMessage="Thanks — this is a demo, nothing was actually sent."
      >
        <input name="email" defaultValue="person@example.com" />
      </ConceptForm>
    );

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() =>
      expect(
        screen.getByText("Thanks — this is a demo, nothing was actually sent.")
      ).toBeInTheDocument()
    );
  });

  it("makes no network request when submitted", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(
      <ConceptForm
        fields={[{ name: "email", required: true }]}
        submitLabel="Send"
        successMessage="Sent"
      >
        <input name="email" defaultValue="person@example.com" />
      </ConceptForm>
    );

    fireEvent.click(screen.getByText("Send"));
    await waitFor(() => expect(screen.getByText("Sent")).toBeInTheDocument());

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
