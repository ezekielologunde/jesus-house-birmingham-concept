"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { NotConfiguredNotice } from "@/components/admin/NotConfiguredNotice";
import { useAdminData } from "@/lib/useAdminData";

export default function AdminContact() {
  const { status, data, error } = useAdminData("/api/admin/contact");

  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Messages</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          Real submissions from the public /contact form.
        </p>

        {status === "loading" && <p className="font-body text-sm text-ink/60">Loading…</p>}
        {status === "unconfigured" && <NotConfiguredNotice>{error}</NotConfiguredNotice>}
        {status === "error" && (
          <p className="font-body text-sm text-flame" role="alert">
            {error}
          </p>
        )}
        {status === "ready" && data.messages.length === 0 && (
          <p className="font-body text-sm text-ink/60">No messages yet.</p>
        )}
        {status === "ready" && data.messages.length > 0 && (
          <ul className="flex flex-col gap-3">
            {data.messages.map((m) => (
              <li key={m.id} className="rounded-lg border border-ink/10 p-4">
                <p className="font-body font-semibold">
                  {m.name} <span className="font-normal text-ink/50">&lt;{m.email}&gt;</span>
                </p>
                <p className="font-body text-sm text-ink/70 mt-1">{m.message}</p>
                <p className="font-body text-xs text-ink/40 mt-1">
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </AdminAuthGate>
  );
}
