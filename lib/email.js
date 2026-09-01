import "server-only";

// Sends via Resend's REST API directly (no SDK dependency for one call).
// Silently no-ops until RESEND_API_KEY is set — form submissions still
// save to the database either way (see app/api/*/route.js), this only
// controls whether a copy is also emailed out.
export async function sendEmail({ to, subject, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn("sendEmail skipped — RESEND_API_KEY/RESEND_FROM_EMAIL not configured yet.");
    return { sent: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`sendEmail failed (${res.status}): ${body}`);
    return { sent: false };
  }

  return { sent: true };
}
