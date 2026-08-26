"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { demoEvents } from "@/lib/adminData";

const FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "month", label: "Month (1–12)", type: "number", required: true, min: 1, max: 12 },
  { key: "description", label: "Description", type: "textarea", required: true },
];

export default function AdminEvents() {
  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Events</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          Demo event listings — separate from the real events shown on the public Events page.
        </p>
        <ResourceManager
          resourceLabel="Event"
          fields={FIELDS}
          initialItems={demoEvents}
          renderItemTitle={(item) => item.title}
          renderItemSubtitle={(item) => `Month ${item.month} — ${item.description}`}
        />
      </main>
    </AdminAuthGate>
  );
}
