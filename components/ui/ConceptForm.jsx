"use client";

import { useConceptForm } from "@/lib/useConceptForm";

export function ConceptForm({ fields, submitLabel, successMessage, children }) {
  const { status, error, handleSubmit } = useConceptForm({ fields });

  if (status === "success") {
    return (
      <p role="status" className="text-sanctuary font-medium">
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {children}
      {error ? (
        <p role="alert" className="text-sm text-sanctuary">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-sanctuary text-ivory rounded-full px-6 py-3 font-body font-semibold disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
