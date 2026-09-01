import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/adminApiAuth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request, { params }) {
  if (!(await isAdminRequestAuthed(request))) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const { prayedFor } = await request.json().catch(() => ({}));

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY isn't set yet." }, { status: 503 });
  }

  const { error } = await supabase
    .from("prayer_requests")
    .update({ prayed_for: Boolean(prayedFor) })
    .eq("id", id);

  if (error) {
    console.error("prayer_requests update failed:", error.message);
    return NextResponse.json({ error: "Failed to update the request." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
