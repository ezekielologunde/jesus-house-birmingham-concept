import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/adminApiAuth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(request) {
  if (!(await isAdminRequestAuthed(request))) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY isn't set yet." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("prayer_requests select failed:", error.message);
    return NextResponse.json({ error: "Failed to load prayer requests." }, { status: 500 });
  }

  return NextResponse.json({ requests: data });
}
