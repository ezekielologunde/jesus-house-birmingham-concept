"use client";

import { useState } from "react";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { demoPrayerRequests } from "@/lib/adminData";

export default function AdminPrayer() {
  const [requests, setRequests] = useState(demoPrayerRequests);

  function togglePrayedFor(id) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, prayedFor: !r.prayedFor } : r)));
  }

  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Prayer Requests</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          Demo prayer request inbox — sample submissions, not real requests from real visitors.
        </p>
        <ul className="flex flex-col gap-3">
          {requests.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-ink/10 p-4 flex flex-wrap items-start justify-between gap-3"
            >
              <div>
                <p className="font-body font-semibold">{r.name}</p>
                <p className="font-body text-sm text-ink/70 mt-1">{r.message}</p>
                <p className="font-body text-xs text-ink/40 mt-1">{r.submittedAt}</p>
              </div>
              <button
                type="button"
                onClick={() => togglePrayedFor(r.id)}
                className={
                  r.prayedFor
                    ? "shrink-0 rounded-full bg-royal/10 text-royal px-4 py-2 text-sm font-body font-semibold"
                    : "shrink-0 rounded-full border border-ink/20 px-4 py-2 text-sm font-body font-semibold hover:border-ink/40 transition-colors duration-200"
                }
              >
                {r.prayedFor ? "Prayed for ✓" : "Mark as prayed for"}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </AdminAuthGate>
  );
}
