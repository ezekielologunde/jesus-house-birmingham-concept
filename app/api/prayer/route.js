import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";
import { sendEmail } from "@/lib/email";

export async function POST(request) {
  const { name, request: prayerRequest } = await request.json().catch(() => ({}));

  if (!name?.trim() || !prayerRequest?.trim()) {
    return NextResponse.json({ error: "Name and prayer request are required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Form storage isn't configured yet." }, { status: 503 });
  }

  const { error } = await supabase
    .from("prayer_requests")
    .insert({ name: name.trim(), request: prayerRequest.trim() });

  if (error) {
    console.error("prayer_requests insert failed:", error.message);
    return NextResponse.json({ error: "Something went wrong saving your request." }, { status: 500 });
  }

  // Fire-and-forget: a slow/failed email shouldn't fail the submission —
  // the request is already safely saved above either way.
  sendEmail({
    to: "pastorate@jesushousebhm.org",
    subject: `New prayer request from ${name.trim()}`,
    text: prayerRequest.trim(),
  }).catch((err) => console.error("prayer request email failed:", err));

  return NextResponse.json({ ok: true });
}
