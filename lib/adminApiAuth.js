import "server-only";
import { adminTokenHash } from "@/lib/adminTokenHash";

// middleware.js only matches /admin/:path* (page routes) — it never sees
// /api/admin/* requests, so every admin API route re-checks the same
// httpOnly cookie here before touching real data.
export async function isAdminRequestAuthed(request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const cookie = request.cookies.get("admin_session")?.value;
  if (!cookie) return false;

  return cookie === (await adminTokenHash(password));
}
