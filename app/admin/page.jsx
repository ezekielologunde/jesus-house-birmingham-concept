"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_DEMO_PASSWORD, isAdminAuthed, setAdminAuthed } from "@/lib/adminAuth";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAdminAuthed()) router.replace("/admin/dashboard");
  }, [router]);

  function handleSubmit(event) {
    event.preventDefault();
    if (password === ADMIN_DEMO_PASSWORD) {
      setAdminAuthed(true);
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <main className="px-6 pt-10 pb-24 max-w-md mx-auto">
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-2">Admin Login</h1>
      <p className="font-body text-sm text-ink/60 mb-8">
        Demo console for this unofficial concept build — not a real authentication system.
        Demo password: <code className="bg-ink/5 px-1 py-0.5 rounded">{ADMIN_DEMO_PASSWORD}</code>
      </p>
      <form onSubmit={handleSubmit} method="dialog" noValidate className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm font-body">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            className="border border-ink/20 rounded-lg px-3 py-2 outline-none focus:border-ink/40"
          />
        </label>
        {error ? (
          <p role="alert" className="text-sm text-flame">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="self-start rounded-full bg-royal text-ivory px-6 py-3 font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200"
        >
          Log In
        </button>
      </form>
    </main>
  );
}
