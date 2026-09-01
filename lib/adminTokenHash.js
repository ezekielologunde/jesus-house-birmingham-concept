// Shared by middleware.js (Edge runtime) and the admin API routes (Node
// runtime) — crypto.subtle is available in both, so this stays dependency-
// free and safe to import from either.
export async function adminTokenHash(password) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
