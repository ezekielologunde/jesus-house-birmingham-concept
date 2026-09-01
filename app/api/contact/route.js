import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";
import { sendEmail } from "@/lib/email";

export async function POST(request) {
  const { name, email, message } = await request.json().catch(() => ({}));

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Form storage isn't configured yet." }, { status: 503 });
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ name: name.trim(), email: email.trim(), message: message.trim() });

  if (error) {
    console.error("contact_messages insert failed:", error.message);
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 500 });
  }

  sendEmail({
    to: "secretary@jesushousebhm.org",
    subject: `New website message from ${name.trim()}`,
    text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
  }).catch((err) => console.error("contact message email failed:", err));

  return NextResponse.json({ ok: true });
}
