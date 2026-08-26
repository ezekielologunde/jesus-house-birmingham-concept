"use client";

import { useState, useCallback } from "react";

export function useConceptForm({ fields }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const missing = fields.find(
        (field) => field.required && !String(data.get(field.name) ?? "").trim()
      );
      if (missing) {
        setError(`${missing.name} is required.`);
        setStatus("idle");
        return;
      }

      setError(null);
      setStatus("submitting");

      // Phase 1 has no backend — this simulates a submit so the UI is fully
      // functional without delivering anything over the network.
      setTimeout(() => {
        setStatus("success");
      }, 400);
    },
    [fields]
  );

  return { status, error, handleSubmit };
}
