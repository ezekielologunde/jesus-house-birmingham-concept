import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client — uses the service_role secret key, which bypasses RLS
// entirely. Only ever imported from Server Components/Route Handlers behind
// the /admin password gate (see middleware.js); never bundled for the
// browser (the `server-only` import throws a build error if it ever is).
let cached = null;

export function getSupabaseAdminClient() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}
