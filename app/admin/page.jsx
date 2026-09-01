"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthed, setAdminAuthed } from "@/lib/adminAuth";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdminAuthed()) router.replace("/admin/dashboard");
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(body.error || "Incorrect password.");
        setSubmitting(false);
        return;
      }

      setAdminAuthed(true);
      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="px-6 pt-10 pb-24 max-w-md mx-auto">
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Admin Login</h1>
      <p className="font-body text-sm text-ink/60 mb-8">
        Real, password-protected admin console for Jesus House Birmingham (unofficial concept
        build — see the site footer). Not the church&rsquo;s own admin system.
      </p>
      <form onSubmit={handleSubmit} method="dialog" noValidate className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm font-body">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            className="border border-ink/20 rounded-lg px-3 py-2 outline-none focus:border-ink/40"
          />
        </label>
        {error ? (
          <p role="alert" className="text-sm text-flame">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200 disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log In"}
        </button>
      </form>
    </main>
  );
}
