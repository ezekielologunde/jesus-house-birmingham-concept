import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function POST(request) {
  const { email } = await request.json().catch(() => ({}));

  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Form storage isn't configured yet." }, { status: 503 });
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });

  if (error) {
    // Unique violation (already subscribed) reads as success to the visitor
    // — no need to leak whether an email is already on the list.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    console.error("newsletter_subscribers insert failed:", error.message);
    return NextResponse.json({ error: "Something went wrong subscribing." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
