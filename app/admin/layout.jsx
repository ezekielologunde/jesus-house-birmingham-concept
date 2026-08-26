import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin | Jesus House Birmingham (Unofficial Concept)",
};

export default function AdminLayout({ children }) {
  return (
    <div className="pt-24">
      <div className="bg-flame/10 border-b border-flame/20 px-6 py-2 text-center">
        <p className="font-body text-xs text-ink/70">
          Demo admin console (Phase 3 concept) — no real backend. Changes here are in-memory
          only, reset on refresh, and never affect the public site.
        </p>
      </div>
      <AdminNav />
      {children}
    </div>
  );
}
