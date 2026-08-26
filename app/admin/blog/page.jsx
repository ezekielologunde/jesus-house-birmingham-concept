"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { demoBlogPosts } from "@/lib/adminData";

const FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "publishedDate", label: "Published date", type: "date", required: true },
  { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { key: "body", label: "Body", type: "textarea", required: true },
];

export default function AdminBlog() {
  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Blog</h1>
        <p className="font-body text-sm text-ink/60 mb-8">Demo blog posts for the admin console.</p>
        <ResourceManager
          resourceLabel="Post"
          fields={FIELDS}
          initialItems={demoBlogPosts}
          renderItemTitle={(item) => item.title}
          renderItemSubtitle={(item) => `${item.publishedDate} — ${item.excerpt}`}
        />
      </main>
    </AdminAuthGate>
  );
}
