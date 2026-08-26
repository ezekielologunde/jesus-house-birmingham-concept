"use client";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { demoGalleryItems } from "@/lib/adminData";

const FIELDS = [
  { key: "caption", label: "Caption", type: "text", required: true },
  { key: "photographer", label: "Photographer credit", type: "text", required: false },
  { key: "imageUrl", label: "Image URL", type: "url", required: true },
];

export default function AdminGallery() {
  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Gallery</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          Demo gallery entries — separate from the real photos shown on the public Gallery page.
        </p>
        <ResourceManager
          resourceLabel="Photo"
          fields={FIELDS}
          initialItems={demoGalleryItems}
          renderItemTitle={(item) => item.caption}
          renderItemSubtitle={(item) => (
            <span className="flex items-center gap-2">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt="" className="w-10 h-10 object-cover rounded shrink-0" />
              ) : null}
              <span>{item.photographer ? `Photo: ${item.photographer}` : "No credit listed"}</span>
            </span>
          )}
        />
      </main>
    </AdminAuthGate>
  );
}
