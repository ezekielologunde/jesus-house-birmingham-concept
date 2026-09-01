const SESSION_KEY = "jhb-admin-demo-session";

// Client-side-only mirror of the real session — purely a UX nicety so
// AdminAuthGate can skip straight to protected content (or the login page
// can skip straight to the dashboard) without a round trip, on top of the
// real server-side gate. The actual security boundary is middleware.js,
// which checks an httpOnly cookie set by app/api/admin/login/route.js —
// this sessionStorage flag proves nothing on its own and grants no access.
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
