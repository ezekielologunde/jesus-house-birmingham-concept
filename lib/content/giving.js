// Sourced from a photo of the church's own physical giving-options signage,
// supplied by the site owner on 2026-08-26. The "Give Online" link is the
// church's actual OneChurch giving portal (confirmed live — its API lists
// real designations: Tithe, Offering, Food Bank, YAYA, Kingdom Men, Women
// of Purpose, etc., matching the real groups directory). No QR codes are
// generated for this build (a mis-scanned QR is a real-money risk).
// `color` gives each card its own accent, matching the distinct colored box
// each method has on the church's own signage (icon name resolves in
// app/giving/page.jsx, kept out of this data file on purpose).
export const givingMethods = [
  {
    id: "app",
    name: "One Church JHB App",
    detail: "Search for the One Church JHB app in your phone's app store to give.",
    href: null,
    color: "#0891b2",
    icon: "smartphone",
  },
  {
    id: "online",
    name: "Give Online",
    detail: "Give through the church's own OneChurch giving portal — tithe, offering, missions, and other real designations.",
    href: "https://jesushousebhm.onechurchsoftware.com/public/give",
    color: "#dc2626",
    icon: "globe",
  },
  {
    id: "zelle",
    name: "Zelle",
    detail: "Send to The Redeemed Christian Church of God at 205-586-9854.",
    href: null,
    color: "#7c3aed",
    icon: "send",
  },
  {
    id: "krispay",
    name: "KrisPay",
    detail: "Scan with the KrisPay app to pay — search for RCCG Jesus House Birmingham.",
    href: null,
    color: "#16a34a",
    icon: "qrcode",
  },
  {
    id: "text",
    name: "Text-to-Give",
    detail: 'Text "GIVE" and an amount (e.g. "GIVE 25") to (833) 271-1840.',
    href: null,
    color: "#ffc53d",
    icon: "message-square",
  },
  {
    id: "cash-check",
    name: "Cash or Check",
    detail: "Ask an usher for an envelope at any service.",
    href: null,
    color: "#a8380a",
    icon: "banknote",
  },
];
