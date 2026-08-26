import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Jesus House Birmingham | Unofficial Redesign Concept",
  description:
    "An unofficial, motion-interactive redesign concept for Jesus House Birmingham (RCCG) — not affiliated with or endorsed by the church.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body bg-ivory text-ink antialiased">{children}</body>
    </html>
  );
}
