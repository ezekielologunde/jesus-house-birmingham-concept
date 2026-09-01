"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { setAdminAuthed } from "@/lib/adminAuth";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/prayer", label: "Prayer Requests" },
  { href: "/admin/newsletter", label: "Newsletter" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin") return null;

  function handleLogout() {
    // Fire-and-forget: clears the real httpOnly session cookie server-side.
    // Not awaited — the client-side state below is what the UI (and
    // middleware, on next request) actually depend on for the redirect.
    fetch("/api/admin/login", { method: "DELETE" }).catch(() => {});
    setAdminAuthed(false);
    router.push("/admin");
  }

  return (
    <nav className="border-b border-ink/10 bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-body">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-semibold text-royal"
                : "text-ink/70 hover:text-ink transition-colors duration-200"
            }
          >
            {link.label}
          </Link>
        ))}
        <span className="grow" />
        <Link
          href="/"
          className="text-ink/50 hover:text-ink/80 underline transition-colors duration-200"
        >
          View public site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="text-ink/70 hover:text-ink transition-colors duration-200"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
