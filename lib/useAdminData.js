"use client";

import { useState, useEffect, useCallback } from "react";

// Shared fetch-state for the admin console's real-data pages (prayer,
// contact, newsletter). Surfaces a distinct "not configured yet" state
// (503, before SUPABASE_SERVICE_ROLE_KEY is set) from a generic error,
// so the console explains itself instead of just looking broken.
export function useAdminData(endpoint) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  const reload = useCallback(() => {
    setState({ status: "loading", data: null, error: null });
    fetch(endpoint)
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          setState({
            status: res.status === 503 ? "unconfigured" : "error",
            data: null,
            error: body.error || "Something went wrong.",
          });
          return;
        }
        setState({ status: "ready", data: body, error: null });
      })
      .catch(() => setState({ status: "error", data: null, error: "Something went wrong." }));
  }, [endpoint]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...state, reload };
}
