"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";

export function AdminAuthGate({ children }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isAdminAuthed()) {
      setAuthed(true);
    } else {
      router.replace("/admin");
    }
    setChecked(true);
  }, [router]);

  if (!checked || !authed) {
    return <p className="font-body text-sm text-ink/60 px-6 py-16">Checking access…</p>;
  }

  return children;
}
