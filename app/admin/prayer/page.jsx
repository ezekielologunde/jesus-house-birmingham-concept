"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { NotConfiguredNotice } from "@/components/admin/NotConfiguredNotice";
import { useAdminData } from "@/lib/useAdminData";

export default function AdminPrayer() {
  const { status, data, error, reload } = useAdminData("/api/admin/prayer");

  async function togglePrayedFor(request) {
    const res = await fetch(`/api/admin/prayer/${request.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prayedFor: !request.prayed_for }),
    });
    if (res.ok) reload();
  }

  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Prayer Requests</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          Real submissions from the public /prayer form.
        </p>

        {status === "loading" && <p className="font-body text-sm text-ink/60">Loading…</p>}
        {status === "unconfigured" && <NotConfiguredNotice>{error}</NotConfiguredNotice>}
        {status === "error" && (
          <p className="font-body text-sm text-flame" role="alert">
            {error}
          </p>
        )}
        {status === "ready" && data.requests.length === 0 && (
          <p className="font-body text-sm text-ink/60">No prayer requests yet.</p>
        )}
        {status === "ready" && data.requests.length > 0 && (
          <ul className="flex flex-col gap-3">
            {data.requests.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-ink/10 p-4 flex flex-wrap items-start justify-between gap-3"
              >
                <div>
                  <p className="font-body font-semibold">{r.name}</p>
                  <p className="font-body text-sm text-ink/70 mt-1">{r.request}</p>
                  <p className="font-body text-xs text-ink/40 mt-1">
                    {new Date(r.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePrayedFor(r)}
                  className={
                    r.prayed_for
                      ? "shrink-0 rounded-full bg-royal/10 text-royal px-4 py-2 text-sm font-body font-semibold"
                      : "shrink-0 rounded-full border border-ink/20 px-4 py-2 text-sm font-body font-semibold hover:border-ink/40 transition-colors duration-200"
                  }
                >
                  {r.prayed_for ? "Prayed for ✓" : "Mark as prayed for"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </AdminAuthGate>
  );
}
