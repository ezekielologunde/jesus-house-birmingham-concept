"use client";

import Link from "next/link";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { useAdminData } from "@/lib/useAdminData";
import { demoEvents, demoAnnouncements, demoGalleryItems, demoBlogPosts } from "@/lib/adminData";

function countFrom(hook, key) {
  return hook.status === "ready" ? hook.data[key].length : "–";
}

export default function AdminDashboard() {
  const prayer = useAdminData("/api/admin/prayer");
  const contact = useAdminData("/api/admin/contact");
  const newsletter = useAdminData("/api/admin/newsletter");

  const CARDS = [
    { href: "/admin/events", label: "Events", count: demoEvents.length, demo: true },
    { href: "/admin/announcements", label: "Announcements", count: demoAnnouncements.length, demo: true },
    { href: "/admin/gallery", label: "Gallery Photos", count: demoGalleryItems.length, demo: true },
    { href: "/admin/blog", label: "Blog Posts", count: demoBlogPosts.length, demo: true },
    { href: "/admin/prayer", label: "Prayer Requests", count: countFrom(prayer, "requests") },
    { href: "/admin/contact", label: "Messages", count: countFrom(contact, "messages") },
    { href: "/admin/newsletter", label: "Newsletter Subscribers", count: countFrom(newsletter, "subscribers") },
  ];

  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-5xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Dashboard</h1>
        <p className="font-body text-sm text-ink/60 mb-10">
          Prayer Requests, Messages, and Newsletter Subscribers are real. Events, Announcements,
          Gallery, and Blog are still this demo console&rsquo;s sample content.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-lg border border-ink/10 p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              <p className="font-display text-3xl text-royal">{card.count}</p>
              <p className="font-body text-sm text-ink/70">
                {card.label}
                {card.demo && <span className="text-ink/40"> (demo)</span>}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </AdminAuthGate>
  );
}
