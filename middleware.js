import { NextResponse } from "next/server";
import { adminTokenHash } from "@/lib/adminTokenHash";

// Real, server-side gate for /admin/* — replaces the old sessionStorage-only
// check (components/admin/AdminAuthGate.jsx), which was trivially bypassed
// from devtools and only ever guarded fake demo data. Stateless single
// shared-password design: the login route (app/api/admin/login/route.js)
// sets a cookie equal to SHA-256(ADMIN_PASSWORD); this middleware just
// recomputes that same hash and compares. No session store, no expiry
// beyond the cookie's own maxAge — adequate for one admin editor, not a
// multi-user system.
const PROTECTED_PREFIX = "/admin";
const PUBLIC_PATHS = new Set(["/admin"]); // the login page itself

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith(PROTECTED_PREFIX) || PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  const expected = password ? await adminTokenHash(password) : null;
  const cookie = request.cookies.get("admin_session")?.value;

  if (!expected || cookie !== expected) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
