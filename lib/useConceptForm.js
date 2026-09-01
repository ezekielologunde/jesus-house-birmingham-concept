"use client";

import { useState, useCallback } from "react";

export function useConceptForm({ fields, endpoint }) {
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
        setError(`${missing.label ?? missing.name} is required.`);
        setStatus("idle");
        return;
      }

      setError(null);
      setStatus("submitting");

      // No endpoint given — this call site is intentionally still a
      // simulation (e.g. the admin newsletter broadcaster), not a real
      // submission. Keep the old fake-delay-then-success behavior.
      if (!endpoint) {
        setTimeout(() => setStatus("success"), 400);
        return;
      }

      const payload = Object.fromEntries(fields.map((field) => [field.name, data.get(field.name)]));

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || "Something went wrong. Please try again.");
          }
          setStatus("success");
        })
        .catch((err) => {
          setError(err.message);
          setStatus("idle");
        });
    },
    [fields, endpoint]
  );

  return { status, error, handleSubmit };
}
