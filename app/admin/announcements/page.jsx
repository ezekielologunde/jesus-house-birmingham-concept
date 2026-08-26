"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { demoAnnouncements } from "@/lib/adminData";

const FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "date", label: "Date", type: "date", required: true },
  { key: "body", label: "Body", type: "textarea", required: true },
];

export default function AdminAnnouncements() {
  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Announcements</h1>
        <p className="font-body text-sm text-ink/60 mb-8">Demo announcements for the admin console.</p>
        <ResourceManager
          resourceLabel="Announcement"
          fields={FIELDS}
          initialItems={demoAnnouncements}
          renderItemTitle={(item) => item.title}
          renderItemSubtitle={(item) => `${item.date} — ${item.body}`}
        />
      </main>
    </AdminAuthGate>
  );
}
