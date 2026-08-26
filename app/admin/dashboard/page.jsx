"use client";

import Link from "next/link";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import {
  demoEvents,
  demoAnnouncements,
  demoGalleryItems,
  demoBlogPosts,
  demoPrayerRequests,
  demoNewsletterSubscribers,
} from "@/lib/adminData";

const CARDS = [
  { href: "/admin/events", label: "Events", count: demoEvents.length },
  { href: "/admin/announcements", label: "Announcements", count: demoAnnouncements.length },
  { href: "/admin/gallery", label: "Gallery Photos", count: demoGalleryItems.length },
  { href: "/admin/blog", label: "Blog Posts", count: demoBlogPosts.length },
  { href: "/admin/prayer", label: "Prayer Requests", count: demoPrayerRequests.length },
  { href: "/admin/newsletter", label: "Newsletter Subscribers", count: demoNewsletterSubscribers.length },
];

export default function AdminDashboard() {
  return (
    <AdminAuthGate>
      <main className="px-6 pt-10 pb-24 max-w-5xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Dashboard</h1>
        <p className="font-body text-sm text-ink/60 mb-10">
          Overview of this demo console&rsquo;s sample content.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-lg border border-ink/10 p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              <p className="font-display text-3xl text-royal">{card.count}</p>
              <p className="font-body text-sm text-ink/70">{card.label}</p>
            </Link>
          ))}
        </div>
      </main>
    </AdminAuthGate>
  );
}
