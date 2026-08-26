const SESSION_KEY = "jhb-admin-demo-session";

// Demo-only gate for the Phase 3 admin console concept — this is NOT real
// authentication (no backend, no hashing, the password is public in this
// file). It exists only to give the admin console a login-shaped entry
// point; nothing behind it is real data or a real security boundary.
export const ADMIN_DEMO_PASSWORD = "jhbdemo2026";

export function isAdminAuthed() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "true";
}

export function setAdminAuthed(value) {
  if (typeof window === "undefined") return;
  if (value) {
    window.sessionStorage.setItem(SESSION_KEY, "true");
  } else {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
}
