import { NextResponse } from "next/server";
import { adminTokenHash } from "@/lib/adminTokenHash";

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  const realPassword = process.env.ADMIN_PASSWORD;

  if (!realPassword) {
    return NextResponse.json({ error: "Admin login isn't configured yet." }, { status: 503 });
  }

  if (password !== realPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await adminTokenHash(realPassword);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_session");
  return res;
}
