"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { useConceptForm } from "@/lib/useConceptForm";
import { demoNewsletterSubscribers } from "@/lib/adminData";

const FIELDS = [
  { name: "subject", label: "Subject", required: true },
  { name: "body", label: "Body", required: true },
];

export default function AdminNewsletter() {
  const { status, error, handleSubmit } = useConceptForm({ fields: FIELDS });

  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Newsletter</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          {demoNewsletterSubscribers.length} demo subscribers. Broadcasting here is simulated —
          no real email is sent.
        </p>

        <ul className="flex flex-col gap-1 mb-10">
          {demoNewsletterSubscribers.map((s) => (
            <li key={s.id} className="font-body text-sm text-ink/70">
              {s.email} <span className="text-ink/40">— subscribed {s.subscribedAt}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-ink/10 p-5">
          <p className="font-body text-sm font-semibold mb-4">Send a broadcast</p>
          {status === "success" ? (
            <p role="status" className="text-sm text-gold font-medium">
              Thanks — this is a demo, so nothing was actually sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} method="dialog" noValidate className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-sm font-body">
                Subject
                <input
                  name="subject"
                  type="text"
                  className="border border-ink/20 rounded-lg px-3 py-2 outline-none focus:border-ink/40"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-body">
                Body
                <textarea
                  name="body"
                  rows={5}
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
                disabled={status === "submitting"}
                className="self-start rounded-full bg-royal text-ivory px-5 py-2.5 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : `Send to ${demoNewsletterSubscribers.length} subscribers`}
              </button>
            </form>
          )}
        </div>
      </main>
    </AdminAuthGate>
  );
}
