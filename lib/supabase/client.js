import { createClient } from "@supabase/supabase-js";

// Public, browser-safe client — uses the anon/publishable key, which RLS
// restricts to INSERT-only on the form tables (see the create_form_tables
// migration). It can never read back prayer requests, contact messages, or
// the subscriber list, by design.
let cached = null;

export function getSupabaseClient() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key);
  return cached;
}
