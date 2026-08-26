import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterForm } from "./NewsletterForm";

describe("NewsletterForm", () => {
  it("shows a required error when submitted with no email", async () => {
    render(<NewsletterForm />);
    fireEvent.click(screen.getByText("Subscribe"));
    await waitFor(() => expect(screen.getByText("Email is required.")).toBeInTheDocument());
  });

  it("shows the demo success message after a valid submit, with no real delivery", async () => {
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "person@example.com" },
    });
    fireEvent.click(screen.getByText("Subscribe"));

    await waitFor(() =>
      expect(
        screen.getByText("Thanks — this is a demo, so nothing was actually sent.")
      ).toBeInTheDocument()
    );
  });

  it("makes no network request when submitted", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "person@example.com" },
    });
    fireEvent.click(screen.getByText("Subscribe"));

    await waitFor(() =>
      expect(
        screen.getByText("Thanks — this is a demo, so nothing was actually sent.")
      ).toBeInTheDocument()
    );

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
