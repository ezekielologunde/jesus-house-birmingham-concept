import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/navigation/Nav";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = "Jesus House Birmingham | Unofficial Redesign Concept";
const DESCRIPTION =
  "An unofficial, motion-interactive redesign concept for Jesus House Birmingham (Redeemed Christian Church of God) — not affiliated with or endorsed by the church.";

export const metadata = {
  metadataBase: new URL("https://jesus-house-birmingham-concept.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: "Jesus House Birmingham (Unofficial Concept)",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable}`}>
      <body className="font-body bg-ivory text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-royal focus:text-ivory focus:px-5 focus:py-3 focus:font-body focus:font-semibold focus:shadow-cta"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <SmoothScroll>
          <Nav />
          <div id="main-content">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
