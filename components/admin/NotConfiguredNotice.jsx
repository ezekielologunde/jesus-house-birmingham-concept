export function NotConfiguredNotice({ children }) {
  return (
    <p className="font-body text-sm bg-sky rounded-lg px-4 py-3 text-ink/80">
      {children ?? "This isn't connected to real data yet — SUPABASE_SERVICE_ROLE_KEY needs to be set."}
    </p>
  );
}
