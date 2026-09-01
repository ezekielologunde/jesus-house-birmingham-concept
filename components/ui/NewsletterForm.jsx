"use client";

import { useConceptForm } from "@/lib/useConceptForm";

const FIELDS = [{ name: "email", label: "Email", required: true }];

export function NewsletterForm() {
  const { status, error, handleSubmit } = useConceptForm({ fields: FIELDS, endpoint: "/api/newsletter" });

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-gold font-medium">
        Thanks — you&rsquo;re subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} method="dialog" noValidate className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          aria-label="Email"
          className="flex-grow min-w-0 border border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/50 rounded-lg px-3 py-2 text-sm outline-none focus:border-ivory/40 transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 bg-royal text-ivory rounded-lg px-4 py-2 text-sm font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200 disabled:opacity-60"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-xs text-gold">
          {error}
        </p>
      ) : null}
    </form>
  );
}
