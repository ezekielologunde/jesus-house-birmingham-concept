import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useConceptForm } from "./useConceptForm";

function makeFormEvent(values) {
  const form = document.createElement("form");
  Object.entries(values).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
  return { preventDefault: vi.fn(), currentTarget: form };
}

describe("useConceptForm", () => {
  it("starts idle", () => {
    const { result } = renderHook(() =>
      useConceptForm({ fields: [{ name: "email", required: true }] })
    );
    expect(result.current.status).toBe("idle");
  });

  it("sets an error and stays idle when a required field is blank", async () => {
    const { result } = renderHook(() =>
      useConceptForm({ fields: [{ name: "email", required: true }] })
    );
    await act(async () => {
      result.current.handleSubmit(makeFormEvent({ email: "" }));
    });
    expect(result.current.status).toBe("idle");
    expect(result.current.error).toMatch(/required/i);
  });

  it("moves through submitting to success without a network call, when required fields are filled", async () => {
    const { result } = renderHook(() =>
      useConceptForm({ fields: [{ name: "email", required: true }] })
    );
    act(() => {
      result.current.handleSubmit(makeFormEvent({ email: "person@example.com" }));
    });
    expect(result.current.status).toBe("submitting");
    await waitFor(() => expect(result.current.status).toBe("success"));
  });
});
