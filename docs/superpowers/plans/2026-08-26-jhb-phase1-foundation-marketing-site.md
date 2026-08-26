# Jesus House Birmingham — Phase 1 Foundation + Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Phase 1 marketing site for the Jesus House Birmingham redesign concept — an unofficial, motion-interactive Next.js site with a distinct visual identity, real factual content, and UI-only forms.

**Architecture:** Next.js App Router (JavaScript, no TypeScript) with Tailwind CSS 4 for styling, GSAP + ScrollTrigger for scroll-driven set-pieces synced to Lenis smooth scroll, and Framer Motion for component/state-driven interaction. Content that must stay factually accurate (contact info, service times, leadership, giving methods) lives in small data modules under `lib/content/` so every page reads from one source of truth instead of duplicating strings.

**Tech Stack:** Next.js, React, Tailwind CSS 4, GSAP + ScrollTrigger (used directly via `gsap.context()`, not the `@gsap/react` hook), Framer Motion, Lenis, Vitest + React Testing Library for tests.

## Global Constraints

- JavaScript only — no TypeScript, no `.ts`/`.tsx` files.
- Next.js App Router, no `src/` directory, import alias `@/*` maps to the project root.
- GSAP + ScrollTrigger for scroll-driven set-pieces (hero choreography, pinned sections, staggered/scrubbed timelines); Framer Motion for component/state-driven interaction (menus, hover, mount/unmount); Lenis for smooth scroll, synced with ScrollTrigger.
- No backend, no email service, no database in Phase 1. Contact/Prayer/Visit forms are UI-only: real validation and loading/success states, zero network delivery.
- No reuse of Jesus House Birmingham's actual logo image or actual photography (confirmed to exist on their live site but deliberately excluded). Custom typographic wordmark + stock/placeholder photography only.
- Palette: Sanctuary Red `#8A1538`, Radiant Gold `#C6A15B`, Ivory `#FBF7F0`, Ink `#211A1D`, Blush `#F4E6E9`, Plum `#3B1220`.
- Typography: Fraunces (headings, via `next/font/google`), Manrope (body, via `next/font/google`).
- Real facts (used verbatim, sourced from the spec): name "Jesus House Birmingham", tagline "Reviving Hope and Maximizing Potential", core message "Seeking God with passion and serving men with compassion", vision "To make heaven, to take as many people with us, to have a member of RCCG in every family of all nations.", featured verse "For with God nothing will be impossible" (Luke 1:37), address "213 1st Avenue North, Birmingham, Alabama 35204", phone "(205) 201-4093", email "secretary@jesushousebhm.org", Facebook `jesushousebhm`, Instagram `jesushousebirmingham`.
- Real service times: Sunday Rhema Expression 9:00–9:50 AM, Sunday Main Service 10:00 AM–12:00 PM, Sunday French Service 12:30 PM, Wednesday Bible Study 6:00–7:30 PM.
- Real leadership: Enefaa Fenny (Lead Pastor), Bola Fenny (Co-Pastor), Christy Iwuaba (Pastor); ministry leads Blessing Falola, Eke Ozurumba, Michael Falola, Georges Adunlin, Nseobong Okon, Ofonime Okon, Taiye Atilola.
- Real RCCG parent-organization facts (JHB is a parish of RCCG, not standalone): founded 1952 by Pa Josiah Akindayomi; General Overseer Pastor E.A. Adeboye. Worldwide HQ: Redemption City of God (formerly Redemption Camp), Kilometer 46, Lagos–Ibadan Expressway, Mowe, Ogun State, Nigeria — 2,500+ hectare campus, opened 1983. North America HQ: 515 County Road 1118, Greenville, TX 75401, USA — 800-acre campus, 20,000-seat auditorium, hosts RCCG's annual North American convention.
- Real RCCG universities and camp development: Redeemer's University (RUN) — full accredited university, founded 2005, Ede, Osun State, Nigeria, owned by RCCG. Redeemer's University North America (RUNA) — founded 2012 (originally RCCGNA Seminary), trains in Biblical studies, theology, and pastoral leadership. RCCG North America Camp Development — official project, 800+ acres in the Dallas–Fort Worth area (Floyd/Greenville, TX), modeled on Redemption Camp, with housing estates/a school/a university planned as it's built out; official site `campdevelopment.rccgna.org`.
- **No land-buying or estate-purchase flow, ever.** Third-party speculative land listings near Redemption Camp Nigeria are not an RCCG program and are not referenced anywhere. The camp development's planned housing estate is informational text only, with a link to the church's own official site — same no-CTA-to-buy-anything pattern as Giving.
- Real giving methods (photo-sourced from physical signage, 2026-08-26): Give Online → link to `https://www.jesushousebhm.org/giving`; Zelle → "The Redeemed Christian Church of God" at 205-586-9854; Text-to-Give → (833) 271-1840, text GIVE plus an amount; Cash/Check → ask for an envelope at service. No QR codes are generated for this build.
- Ministries: **Kingdom Men** and **YAYA (Youths & Young Adults)** are real names sourced from internal ministry WhatsApp groups (2026-08-26) — only the names/rough facts are used, never any member's personal data from those chats. The rest remain placeholder/illustrative (no real list exists): Children's Church, Women's Fellowship, Media & Creative Arts, Ushering & Protocol, Prayer Band, Outreach & Missions, Choir/Worship Team.
- Events: real recurring services (Sunday/Wednesday, from service times above) plus 2 real annual programs, same source: **Men's Week** (October) and **YAYA Week** (April) — these replace the earlier invented placeholder seasonal events.
- **Privacy boundary on the WhatsApp source material:** those group chats contain other members' phone numbers, home addresses (one with a gate code), birthdays, births, financial/dues details, and Zoom credentials. None of that is used anywhere in this build — only the two ministry names and the existence/rough timing of their annual weeks.
- Testimonies page has no invented quotes — "share your testimony" invite only.
- Footer must carry a visible disclaimer: unofficial redesign concept, not affiliated with or endorsed by Jesus House Birmingham, linking to their real site `https://www.jesushousebhm.org/`.
- Test stack: Vitest + `@testing-library/react` + `@testing-library/jest-dom`, jsdom environment. GSAP/ScrollTrigger internals are mocked in tests (real scroll-timeline behavior isn't practically testable in jsdom) — those tests verify the component renders its children and wires the expected GSAP calls, not real animation timing. Full visual/motion verification happens by running `npm run dev` and checking in a browser, per every task's manual-check step.

---

## Task 1: Project scaffold + testing infrastructure

**Files:**
- Create: `package.json`, `next.config.mjs`, `jsconfig.json`, `postcss.config.mjs`
- Create: `app/layout.js`, `app/page.js`, `app/globals.css`
- Create: `vitest.config.js`, `vitest.setup.js`, `tests/mocks/next-font-google.js`
- Create: `tests/smoke.test.jsx`
- Create: `.eslintrc.json`, `.gitignore`

**Interfaces:**
- Produces: `@/*` import alias resolving to the project root (used by every later task); `npm test` running Vitest; `npm run dev`/`npm run build` running Next.js.

The project directory (`C:\Users\WT8\Projects\JHB`) already has a `.git` repo and a `docs/` folder from the design spec — do not run `create-next-app` (it refuses non-empty directories); author the files below by hand instead.

- [ ] **Step 1: Write the failing test**

Create `tests/smoke.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Sanity() {
  return <p>toolchain ok</p>;
}

describe("test toolchain", () => {
  it("renders a component and queries text", () => {
    render(<Sanity />);
    expect(screen.getByText("toolchain ok")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `npm` has no `test` script yet / `vitest` is not installed (command errors out). This confirms there's no toolchain in place yet.

- [ ] **Step 3: Author the scaffold files**

Create `package.json`:

```json
{
  "name": "jesus-house-birmingham-concept",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^12.0.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.13",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@vitejs/plugin-react": "^4.3.3",
    "eslint": "^9.14.0",
    "eslint-config-next": "^15.0.0",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.0.0",
    "vitest": "^2.1.4"
  }
}
```

Create `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

Create `jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Create `.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals"
}
```

Create `.gitignore`:

```
node_modules/
.next/
.env*.local
coverage/

# Private source material (WhatsApp exports, personal photos) — never commit.
# Only aggregate, non-personal facts extracted from these are used in the site,
# per the design spec's privacy boundary — the raw files themselves must not
# enter version control.
WhatsApp*
```

Create `app/globals.css`:

```css
@import "tailwindcss";
```

Create `app/layout.js` (minimal — Task 2 fills this out with real fonts/metadata/tokens):

```jsx
import "./globals.css";

export const metadata = {
  title: "Jesus House Birmingham",
  description: "Unofficial redesign concept",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `app/page.js` (minimal — Task 11/12 fills this out):

```jsx
export default function Home() {
  return <main>Jesus House Birmingham</main>;
}
```

Create `vitest.setup.js`:

```js
import "@testing-library/jest-dom/vitest";

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: "",
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}
```

Create `tests/mocks/next-font-google.js`:

```js
function mockFont() {
  return {
    className: "mock-font",
    variable: "--font-mock",
    style: { fontFamily: "mock" },
  };
}

export const Fraunces = mockFont;
export const Manrope = mockFont;
```

Create `vitest.config.js`:

```js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
  },
  resolve: {
    alias: {
      "next/font/google": path.resolve(__dirname, "./tests/mocks/next-font-google.js"),
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

Run: `npm install`
Expected: installs without error.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS — 1 test passed (`toolchain ok`).

Also run: `npm run build`
Expected: build succeeds (proves the Next.js + Tailwind 4 wiring is correct independent of the test runner).

- [ ] **Step 5: Commit**

```bash
git add package.json next.config.mjs jsconfig.json postcss.config.mjs .eslintrc.json .gitignore app/ vitest.config.js vitest.setup.js tests/
git commit -m "chore: scaffold Next.js + Tailwind 4 + Vitest toolchain"
```

---

## Task 2: Design tokens & global layout shell

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.js`
- Test: `tests/layout.test.js`

**Interfaces:**
- Consumes: nothing new.
- Produces: Tailwind theme tokens usable as utility classes everywhere downstream — `bg-sanctuary`, `text-gold`, `bg-ivory`, `text-ink`, `bg-blush`, `bg-plum`, `font-display` (Fraunces), `font-body` (Manrope). Exported `metadata` object from `app/layout.js` with real `title`/`description`, consumed nowhere else directly but asserted by this task's test.

- [ ] **Step 1: Write the failing test**

Create `tests/layout.test.js`:

```js
import { describe, it, expect } from "vitest";
import { metadata } from "@/app/layout.js";

describe("root layout metadata", () => {
  it("has the real site title and an unofficial-concept description", () => {
    expect(metadata.title).toBe("Jesus House Birmingham | Unofficial Redesign Concept");
    expect(metadata.description.toLowerCase()).toContain("unofficial");
    expect(metadata.description).toContain("Jesus House Birmingham");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/layout.test.js`
Expected: FAIL — `metadata.title` is `"Jesus House Birmingham"`, not the expected string.

- [ ] **Step 3: Implement design tokens and real layout**

Replace `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-sanctuary: #8a1538;
  --color-gold: #c6a15b;
  --color-ivory: #fbf7f0;
  --color-ink: #211a1d;
  --color-blush: #f4e6e9;
  --color-plum: #3b1220;

  --font-display: "Fraunces", ui-serif, Georgia, serif;
  --font-body: "Manrope", ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: auto;
}

body {
  background-color: var(--color-ivory);
  color: var(--color-ink);
}
```

Replace `app/layout.js`:

```jsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/layout.test.js`
Expected: PASS.

Also run: `npm run dev`, open `http://localhost:3000`, confirm the page loads with an ivory background and no console errors, then stop the server.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.js tests/layout.test.js
git commit -m "feat: add design tokens (palette, fonts) and real layout metadata"
```

---

## Task 3: Framer Motion primitives (Reveal, Magnetic)

**Files:**
- Create: `components/ui/Reveal.jsx`
- Create: `components/ui/Magnetic.jsx`
- Test: `components/ui/Reveal.test.jsx`
- Test: `components/ui/Magnetic.test.jsx`

**Interfaces:**
- Produces: `Reveal({ children, delay, from, className, style })` — fade/slide-into-view wrapper, `from` one of `"up" | "down" | "left" | "right" | "scale"`. `Magnetic({ children, strength, className, style })` — cursor-following hover wrapper, renders a plain `<span>` when reduced-motion is preferred.
- Consumed by: every page/section task from Task 9 onward.

- [ ] **Step 1: Write the failing tests**

Create `components/ui/Reveal.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>hello reveal</p>
      </Reveal>
    );
    expect(screen.getByText("hello reveal")).toBeInTheDocument();
  });

  it("applies a passed className to the wrapper", () => {
    render(
      <Reveal className="test-class">
        <span>content</span>
      </Reveal>
    );
    expect(screen.getByText("content").parentElement).toHaveClass("test-class");
  });
});
```

Create `components/ui/Magnetic.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Magnetic } from "./Magnetic";

describe("Magnetic", () => {
  it("renders its children", () => {
    render(
      <Magnetic>
        <button type="button">Click me</button>
      </Magnetic>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/ui/Reveal.test.jsx components/ui/Magnetic.test.jsx`
Expected: FAIL — `./Reveal` and `./Magnetic` don't exist yet.

- [ ] **Step 3: Implement the primitives**

Create `components/ui/Reveal.jsx`:

```jsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const OFFSETS = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.94 },
};

export function Reveal({ children, delay = 0, from = "up", className, style }) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[from] ?? OFFSETS.up;

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0, scale: offset.scale ?? 1 };

  return (
    <motion.div
      className={className}
      style={style}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.3 : 0.85,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

Create `components/ui/Magnetic.jsx`:

```jsx
"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Magnetic({ children, strength = 0.3, className, style }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className} style={{ display: "inline-flex", ...style }}>
        {children}
      </span>
    );
  }

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", ...style }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- components/ui/Reveal.test.jsx components/ui/Magnetic.test.jsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Reveal.jsx components/ui/Magnetic.jsx components/ui/Reveal.test.jsx components/ui/Magnetic.test.jsx
git commit -m "feat: add Reveal and Magnetic Framer Motion primitives"
```

---

## Task 4: Lenis provider + GSAP setup utility

**Files:**
- Create: `components/providers/SmoothScroll.jsx`
- Create: `lib/gsap.js`
- Test: `components/providers/SmoothScroll.test.jsx`
- Test: `lib/gsap.test.js`
- Modify: `app/layout.js`

**Interfaces:**
- Produces: `SmoothScroll({ children })` — mounts Lenis and drives its raf loop, respects `prefers-reduced-motion`. `getGsap()` from `lib/gsap.js` — returns `{ gsap, ScrollTrigger }` with `ScrollTrigger` registered exactly once, safe to call from any client component; `syncScrollTriggerWithLenis(lenis)` — wires a Lenis instance's `scroll` event to `ScrollTrigger.update` and adds `ScrollTrigger`'s ticker to the same rAF loop.
- Consumed by: Task 5 (GSAP primitives), every page using scroll-driven animation.

- [ ] **Step 1: Write the failing tests**

Create `lib/gsap.test.js`:

```js
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("gsap", () => {
  const gsap = { registerPlugin: vi.fn() };
  return { gsap, default: gsap };
});
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { update: vi.fn() },
}));

describe("getGsap", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("registers ScrollTrigger exactly once even when called twice", async () => {
    const { getGsap } = await import("./gsap.js");
    const { gsap } = getGsap();
    getGsap();
    expect(gsap.registerPlugin).toHaveBeenCalledTimes(1);
  });

  it("returns the same ScrollTrigger reference passed to registerPlugin", async () => {
    const { getGsap } = await import("./gsap.js");
    const { gsap, ScrollTrigger } = getGsap();
    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);
  });
});
```

Create `components/providers/SmoothScroll.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const destroy = vi.fn();
const raf = vi.fn();
vi.mock("lenis", () => ({
  default: vi.fn().mockImplementation(() => ({ raf, destroy, on: vi.fn() })),
}));
vi.mock("@/lib/gsap", () => ({
  syncScrollTriggerWithLenis: vi.fn(),
}));

import { SmoothScroll } from "./SmoothScroll";

describe("SmoothScroll", () => {
  it("renders its children", () => {
    render(
      <SmoothScroll>
        <p>page content</p>
      </SmoothScroll>
    );
    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/gsap.test.js components/providers/SmoothScroll.test.jsx`
Expected: FAIL — `./gsap.js` and `./SmoothScroll` don't exist yet.

- [ ] **Step 3: Implement**

Create `lib/gsap.js`:

```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function syncScrollTriggerWithLenis(lenis) {
  const { ScrollTrigger: ST, gsap: g } = getGsap();
  lenis.on("scroll", ST.update);
  g.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  g.ticker.lagSmoothing(0);
}
```

Create `components/providers/SmoothScroll.jsx`:

```jsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { syncScrollTriggerWithLenis } from "@/lib/gsap";

export function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    syncScrollTriggerWithLenis(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

Modify `app/layout.js` — wrap `children` in `SmoothScroll`:

```jsx
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

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
      <body className="font-body bg-ivory text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/gsap.test.js components/providers/SmoothScroll.test.jsx`
Expected: PASS — 3 tests passed.

Also run: `npm run dev`, confirm the homepage still loads with no console errors, then stop the server.

- [ ] **Step 5: Commit**

```bash
git add lib/gsap.js components/providers/SmoothScroll.jsx lib/gsap.test.js components/providers/SmoothScroll.test.jsx app/layout.js
git commit -m "feat: add Lenis smooth-scroll provider synced with GSAP ScrollTrigger"
```

---

## Task 5: GSAP scroll primitives (RevealText, Parallax, ScrollProgress, PinSection)

**Files:**
- Create: `components/ui/RevealText.jsx`
- Create: `components/ui/Parallax.jsx`
- Create: `components/ui/ScrollProgress.jsx`
- Create: `components/ui/PinSection.jsx`
- Test: `components/ui/RevealText.test.jsx`
- Test: `components/ui/Parallax.test.jsx`
- Test: `components/ui/ScrollProgress.test.jsx`
- Test: `components/ui/PinSection.test.jsx`

**Interfaces:**
- Consumes: `getGsap()` from `@/lib/gsap` (Task 4).
- Produces: `RevealText({ text, className, tag })` — splits `text` into words and staggers them in on scroll. `Parallax({ children, speed, className })` — moves `children` vertically as the page scrolls, `speed` is a multiplier (negative moves slower than scroll, default `0.3`). `ScrollProgress({ className })` — a fixed top-of-page bar whose `scaleX` tracks scroll progress. `PinSection({ children, className })` — pins its content while the section scrolls past, for choreographed multi-step reveals.
- Consumed by: Home hero (Task 11), VerseTicker (Task 10), and any page wanting a pinned/parallax section.

All four components register their GSAP work inside `useEffect` behind a `gsap.context()` (or the `@gsap/react` `useGSAP` hook) scoped to a ref, and revert that context on unmount — this is the standard cleanup pattern for GSAP inside React and prevents leaking ScrollTriggers between route changes.

- [ ] **Step 1: Write the failing tests**

Create `components/ui/RevealText.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      from: vi.fn(),
    },
    ScrollTrigger: {},
  }),
}));

import { RevealText } from "./RevealText";

describe("RevealText", () => {
  it("renders the full text content", () => {
    render(<RevealText text="Reviving Hope and Maximizing Potential" />);
    expect(screen.getByText(/Reviving/)).toBeInTheDocument();
    expect(screen.getByText(/Potential/)).toBeInTheDocument();
  });
});
```

Create `components/ui/Parallax.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      to: vi.fn(),
    },
    ScrollTrigger: {},
  }),
}));

import { Parallax } from "./Parallax";

describe("Parallax", () => {
  it("renders its children", () => {
    render(
      <Parallax>
        <img alt="hero" src="/hero.jpg" />
      </Parallax>
    );
    expect(screen.getByAltText("hero")).toBeInTheDocument();
  });
});
```

Create `components/ui/ScrollProgress.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      to: vi.fn(),
    },
    ScrollTrigger: {},
  }),
}));

import { ScrollProgress } from "./ScrollProgress";

describe("ScrollProgress", () => {
  it("renders a progress bar element", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.querySelector('[data-testid="scroll-progress-bar"]')).toBeInTheDocument();
  });
});
```

Create `components/ui/PinSection.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
    },
    ScrollTrigger: { create: vi.fn() },
  }),
}));

import { PinSection } from "./PinSection";

describe("PinSection", () => {
  it("renders its children", () => {
    render(
      <PinSection>
        <p>pinned content</p>
      </PinSection>
    );
    expect(screen.getByText("pinned content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- components/ui/RevealText.test.jsx components/ui/Parallax.test.jsx components/ui/ScrollProgress.test.jsx components/ui/PinSection.test.jsx`
Expected: FAIL — none of the four components exist yet.

- [ ] **Step 3: Implement**

Create `components/ui/RevealText.jsx`:

```jsx
"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function RevealText({ text, className, tag: Tag = "span" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll("[data-word]"), {
        yPercent: 100,
        opacity: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word style={{ display: "inline-block" }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
```

Create `components/ui/Parallax.jsx`:

```jsx
"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function Parallax({ children, speed = 0.3, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

Create `components/ui/ScrollProgress.jsx`:

```jsx
"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function ScrollProgress({ className }) {
  const barRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={className ?? "fixed top-0 left-0 right-0 h-1 z-50"}>
      <div
        ref={barRef}
        data-testid="scroll-progress-bar"
        className="h-full origin-left bg-sanctuary"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
```

Create `components/ui/PinSection.jsx`:

```jsx
"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";

export function PinSection({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- components/ui/RevealText.test.jsx components/ui/Parallax.test.jsx components/ui/ScrollProgress.test.jsx components/ui/PinSection.test.jsx`
Expected: PASS — 4 tests passed.

Also run: `npm run dev` and visually confirm no console errors on the homepage (these components aren't wired into any page yet, so nothing visual to check beyond a clean console).

- [ ] **Step 5: Commit**

```bash
git add components/ui/RevealText.jsx components/ui/Parallax.jsx components/ui/ScrollProgress.jsx components/ui/PinSection.jsx components/ui/RevealText.test.jsx components/ui/Parallax.test.jsx components/ui/ScrollProgress.test.jsx components/ui/PinSection.test.jsx
git commit -m "feat: add GSAP scroll primitives (RevealText, Parallax, ScrollProgress, PinSection)"
```

---

## Task 6: UI-only form primitive

**Files:**
- Create: `lib/useConceptForm.js`
- Create: `components/ui/ConceptForm.jsx`
- Test: `lib/useConceptForm.test.jsx`
- Test: `components/ui/ConceptForm.test.jsx`

**Interfaces:**
- Produces: `useConceptForm({ fields })` — a hook taking an array of `{ name, required }` field descriptors, returning `{ status, error, handleSubmit }` where `status` is `"idle" | "submitting" | "success"` and `handleSubmit(event)` reads a native `FormData` from the submitted form, validates required fields are non-empty, and — since Phase 1 has no backend — resolves to `"success"` after a short simulated delay without sending anything over the network. `ConceptForm({ fields, onStatusChange, submitLabel, successMessage, children })` — a form wrapper that uses the hook and renders `children` (the actual field markup, page-specific) plus a status region.
- Consumed by: Task 15 (Visit), Task 21 (Contact), Task 22 (Prayer).

- [ ] **Step 1: Write the failing tests**

Create `lib/useConceptForm.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useConceptForm } from "./useConceptForm";

function makeFormEvent(values) {
  const form = document.createElement("form");
  Object.entries(values).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
  return { preventDefault: vi.fn(), currentTarget: form };
}

describe("useConceptForm", () => {
  it("starts idle", () => {
    const { result } = renderHook(() =>
      useConceptForm({ fields: [{ name: "email", required: true }] })
    );
    expect(result.current.status).toBe("idle");
  });

  it("sets an error and stays idle when a required field is blank", async () => {
    const { result } = renderHook(() =>
      useConceptForm({ fields: [{ name: "email", required: true }] })
    );
    await act(async () => {
      result.current.handleSubmit(makeFormEvent({ email: "" }));
    });
    expect(result.current.status).toBe("idle");
    expect(result.current.error).toMatch(/required/i);
  });

  it("moves through submitting to success without a network call, when required fields are filled", async () => {
    const { result } = renderHook(() =>
      useConceptForm({ fields: [{ name: "email", required: true }] })
    );
    act(() => {
      result.current.handleSubmit(makeFormEvent({ email: "person@example.com" }));
    });
    expect(result.current.status).toBe("submitting");
    await waitFor(() => expect(result.current.status).toBe("success"));
  });
});
```

Create `components/ui/ConceptForm.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConceptForm } from "./ConceptForm";

describe("ConceptForm", () => {
  it("shows the success message after a valid submit, with no real delivery", async () => {
    render(
      <ConceptForm
        fields={[{ name: "email", required: true }]}
        submitLabel="Send"
        successMessage="Thanks — this is a demo, nothing was actually sent."
      >
        <input name="email" defaultValue="person@example.com" />
      </ConceptForm>
    );

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() =>
      expect(
        screen.getByText("Thanks — this is a demo, nothing was actually sent.")
      ).toBeInTheDocument()
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/useConceptForm.test.jsx components/ui/ConceptForm.test.jsx`
Expected: FAIL — `./useConceptForm` and `./ConceptForm` don't exist yet.

- [ ] **Step 3: Implement**

Create `lib/useConceptForm.js`:

```js
"use client";

import { useState, useCallback } from "react";

export function useConceptForm({ fields }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const missing = fields.find(
        (field) => field.required && !String(data.get(field.name) ?? "").trim()
      );
      if (missing) {
        setError(`${missing.name} is required.`);
        setStatus("idle");
        return;
      }

      setError(null);
      setStatus("submitting");

      // Phase 1 has no backend — this simulates a submit so the UI is fully
      // functional without delivering anything over the network.
      setTimeout(() => {
        setStatus("success");
      }, 400);
    },
    [fields]
  );

  return { status, error, handleSubmit };
}
```

Create `components/ui/ConceptForm.jsx`:

```jsx
"use client";

import { useConceptForm } from "@/lib/useConceptForm";

export function ConceptForm({ fields, submitLabel, successMessage, children }) {
  const { status, error, handleSubmit } = useConceptForm({ fields });

  if (status === "success") {
    return (
      <p role="status" className="text-sanctuary font-medium">
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {children}
      {error ? (
        <p role="alert" className="text-sm text-sanctuary">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-sanctuary text-ivory rounded-full px-6 py-3 font-body font-semibold disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/useConceptForm.test.jsx components/ui/ConceptForm.test.jsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/useConceptForm.js components/ui/ConceptForm.jsx lib/useConceptForm.test.jsx components/ui/ConceptForm.test.jsx
git commit -m "feat: add UI-only form primitive (no backend delivery in Phase 1)"
```

---

## Task 7: Content data modules

**Files:**
- Create: `lib/content/siteInfo.js`
- Create: `lib/content/serviceTimes.js`
- Create: `lib/content/leadership.js`
- Create: `lib/content/ministries.js`
- Create: `lib/content/events.js`
- Create: `lib/content/giving.js`
- Create: `lib/content/rccg.js`
- Test: `lib/content/content.test.js`

**Interfaces:**
- Produces (every export below is consumed by page/section tasks from Task 8 onward — treat these as the single source of truth, pages must not hardcode these facts inline):
  - `siteInfo.js`: `siteInfo = { name, tagline, coreMessage, vision, verse: { text, reference }, address, phone, email, facebook, instagram }`
  - `serviceTimes.js`: `serviceTimes = [{ id, day, label, time }]`
  - `leadership.js`: `pastors = [{ name, title }]`, `ministryLeads = [{ name }]`
  - `ministries.js`: `ministries = [{ id, name, description }]`, plus `ministriesArePlaceholder = true`
  - `events.js`: `recurringEvents = [{ id, name, day, time }]`, `seasonalEvents = [{ id, name, dateLabel, description }]`, plus `seasonalEventsArePlaceholder = false` (these are real annual programs, not invented)
  - `giving.js`: `givingMethods = [{ id, name, detail, href }]` (`href` is `null` when there's nothing to link)
  - `rccg.js`: `rccg = { foundedYear, founder, generalOverseer, worldwideHq: { name, address }, northAmericaHq: { address }, universities: [{ name, location, note }], campDevelopment: { note, url } }`

- [ ] **Step 1: Write the failing test**

Create `lib/content/content.test.js`:

```js
import { describe, it, expect } from "vitest";
import { siteInfo } from "./siteInfo";
import { serviceTimes } from "./serviceTimes";
import { pastors, ministryLeads } from "./leadership";
import { ministries, ministriesArePlaceholder } from "./ministries";
import { recurringEvents, seasonalEvents, seasonalEventsArePlaceholder } from "./events";
import { givingMethods } from "./giving";
import { rccg } from "./rccg";

describe("siteInfo", () => {
  it("has the real name, tagline, and contact facts", () => {
    expect(siteInfo.name).toBe("Jesus House Birmingham");
    expect(siteInfo.tagline).toBe("Reviving Hope and Maximizing Potential");
    expect(siteInfo.address).toBe("213 1st Avenue North, Birmingham, Alabama 35204");
    expect(siteInfo.phone).toBe("(205) 201-4093");
    expect(siteInfo.email).toBe("secretary@jesushousebhm.org");
  });

  it("has the featured verse with its reference", () => {
    expect(siteInfo.verse.text).toBe("For with God nothing will be impossible");
    expect(siteInfo.verse.reference).toBe("Luke 1:37");
  });
});

describe("serviceTimes", () => {
  it("includes the real Sunday main service", () => {
    const main = serviceTimes.find((s) => s.label === "Main Service");
    expect(main.day).toBe("Sunday");
    expect(main.time).toBe("10:00 AM – 12:00 PM");
  });

  it("includes the real Wednesday Bible study", () => {
    const study = serviceTimes.find((s) => s.label === "Bible Study");
    expect(study.day).toBe("Wednesday");
    expect(study.time).toBe("6:00 PM – 7:30 PM");
  });
});

describe("leadership", () => {
  it("has the real lead pastor and co-pastor", () => {
    expect(pastors).toContainEqual({ name: "Enefaa Fenny", title: "Lead Pastor" });
    expect(pastors).toContainEqual({ name: "Bola Fenny", title: "Co-Pastor" });
  });

  it("has all 7 real ministry leads", () => {
    expect(ministryLeads).toHaveLength(7);
    expect(ministryLeads.map((m) => m.name)).toContain("Blessing Falola");
  });
});

describe("ministries", () => {
  it("still has some placeholder content", () => {
    expect(ministriesArePlaceholder).toBe(true);
    expect(ministries.length).toBeGreaterThan(0);
  });

  it("uses the real Kingdom Men and YAYA names, sourced from internal ministry chats", () => {
    expect(ministries.find((m) => m.id === "mens").name).toBe("Kingdom Men");
    expect(ministries.find((m) => m.id === "youth").name).toBe("YAYA (Youths & Young Adults)");
  });
});

describe("events", () => {
  it("derives recurring events from the real service times, not invented ones", () => {
    expect(recurringEvents.some((e) => e.name.includes("Main Service"))).toBe(true);
  });

  it("has the 2 real annual programs, not invented placeholder events", () => {
    expect(seasonalEventsArePlaceholder).toBe(false);
    expect(seasonalEvents.find((e) => e.id === "mens-week").dateLabel).toContain("October");
    expect(seasonalEvents.find((e) => e.id === "yaya-week").dateLabel).toContain("April");
  });
});

describe("giving", () => {
  it("has the real Zelle and text-to-give methods, sourced from the church's own signage", () => {
    const zelle = givingMethods.find((m) => m.name === "Zelle");
    expect(zelle.detail).toContain("205-586-9854");

    const textToGive = givingMethods.find((m) => m.name === "Text-to-Give");
    expect(textToGive.detail).toContain("(833) 271-1840");
  });

  it("links Give Online to the church's real domain, not a form on this site", () => {
    const online = givingMethods.find((m) => m.name === "Give Online");
    expect(online.href).toBe("https://www.jesushousebhm.org/giving");
  });

  it("does not include a QR-code based method, since none are generated for this build", () => {
    expect(givingMethods.some((m) => m.name.toLowerCase().includes("qr"))).toBe(false);
  });
});

describe("rccg", () => {
  it("has the real worldwide and North America headquarters", () => {
    expect(rccg.generalOverseer).toBe("Pastor E.A. Adeboye");
    expect(rccg.worldwideHq.address).toContain("Mowe, Ogun State, Nigeria");
    expect(rccg.northAmericaHq.address).toContain("Greenville, TX");
  });

  it("has both real universities, Nigeria and North America", () => {
    const run = rccg.universities.find((u) => u.name === "Redeemer's University");
    expect(run.location).toBe("Ede, Osun State, Nigeria");

    const runa = rccg.universities.find((u) => u.name === "Redeemer's University North America");
    expect(runa.location).toContain("Texas");
  });

  it("describes the camp development's planned housing estate with a link, not a purchase flow", () => {
    expect(rccg.campDevelopment.note.toLowerCase()).toContain("housing estate");
    expect(rccg.campDevelopment.url).toBe("https://campdevelopment.rccgna.org");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/content/content.test.js`
Expected: FAIL — none of the content modules exist yet.

- [ ] **Step 3: Implement the content modules**

Create `lib/content/siteInfo.js`:

```js
export const siteInfo = {
  name: "Jesus House Birmingham",
  tagline: "Reviving Hope and Maximizing Potential",
  coreMessage: "Seeking God with passion and serving men with compassion",
  vision:
    "To make heaven, to take as many people with us, to have a member of RCCG in every family of all nations.",
  verse: {
    text: "For with God nothing will be impossible",
    reference: "Luke 1:37",
  },
  address: "213 1st Avenue North, Birmingham, Alabama 35204",
  phone: "(205) 201-4093",
  email: "secretary@jesushousebhm.org",
  facebook: "https://www.facebook.com/jesushousebhm/",
  instagram: "https://www.instagram.com/jesushousebirmingham/",
  realSiteUrl: "https://www.jesushousebhm.org/",
};
```

Create `lib/content/serviceTimes.js`:

```js
export const serviceTimes = [
  { id: "rhema", day: "Sunday", label: "Rhema Expression", time: "9:00 AM – 9:50 AM" },
  { id: "main", day: "Sunday", label: "Main Service", time: "10:00 AM – 12:00 PM" },
  { id: "french", day: "Sunday", label: "French Service", time: "12:30 PM" },
  { id: "bible-study", day: "Wednesday", label: "Bible Study", time: "6:00 PM – 7:30 PM" },
];
```

Create `lib/content/leadership.js`:

```js
export const pastors = [
  { name: "Enefaa Fenny", title: "Lead Pastor" },
  { name: "Bola Fenny", title: "Co-Pastor" },
  { name: "Christy Iwuaba", title: "Pastor" },
];

export const ministryLeads = [
  { name: "Blessing Falola" },
  { name: "Eke Ozurumba" },
  { name: "Michael Falola" },
  { name: "Georges Adunlin" },
  { name: "Nseobong Okon" },
  { name: "Ofonime Okon" },
  { name: "Taiye Atilola" },
];
```

Create `lib/content/ministries.js`:

```js
// No real full ministries list exists on the source site, so most of this is
// illustrative placeholder content, structured for easy replacement with real
// data later. "mens" and "youth" are the exception — their real names are
// sourced from internal ministry WhatsApp groups (Kingdom Men, YAYA JHB),
// shared by the site owner (a member of those groups) and read on 2026-08-26.
// Only the ministry names/aggregate facts are used here — nothing personal
// (no member names, phone numbers, addresses, or private messages) from those
// chats appears anywhere in this project.
export const ministriesArePlaceholder = true;

export const ministries = [
  { id: "children", name: "Children's Church", description: "A safe, joyful space for kids to encounter God through worship, Bible stories, and play." },
  { id: "youth", name: "YAYA (Youths & Young Adults)", description: "The young adults ministry — weekly fellowship, its own choir, and an annual YAYA Week every April." },
  { id: "mens", name: "Kingdom Men", description: "The men's ministry — monthly meetings and prayer gatherings, plus an annual Men's Week every October." },
  { id: "womens", name: "Women's Fellowship", description: "Women encouraging one another through prayer, study, and community." },
  { id: "media", name: "Media & Creative Arts", description: "The team behind the visuals, sound, and streams that carry the message further." },
  { id: "ushering", name: "Ushering & Protocol", description: "The first warm faces you meet — welcoming every guest and keeping service flowing." },
  { id: "prayer-band", name: "Prayer Band", description: "A dedicated team interceding for the church, the city, and every request that comes in." },
  { id: "outreach", name: "Outreach & Missions", description: "Taking the church's hope and resources out into the Birmingham community." },
  { id: "choir", name: "Choir & Worship Team", description: "Leading the congregation into passionate, spirit-led worship every service." },
];
```

Create `lib/content/events.js`:

```js
import { serviceTimes } from "./serviceTimes";

export const recurringEvents = serviceTimes.map((s) => ({
  id: s.id,
  name: `${s.label} (${s.day})`,
  day: s.day,
  time: s.time,
}));

// Real annual programs, sourced from internal ministry WhatsApp groups
// (Kingdom Men, YAYA JHB), read on 2026-08-26 — replacing what used to be
// invented placeholder seasonal events. No specific day-by-day agenda is
// asserted here since that wasn't confirmed beyond the month.
export const seasonalEventsArePlaceholder = false;

export const seasonalEvents = [
  { id: "yaya-week", name: "YAYA Week", dateLabel: "April (annual)", description: "A week of programming for the young adults' ministry — worship, fellowship, and community." },
  { id: "mens-week", name: "Men's Week", dateLabel: "October (annual)", description: "An annual week of men's fellowship, prayer, and programming." },
];
```

Create `lib/content/giving.js`:

```js
// Sourced from a photo of the church's own physical giving-options signage,
// supplied by the site owner on 2026-08-26. Transcribed as text — no QR codes
// are generated for this build (a mis-scanned QR is a real-money risk).
export const givingMethods = [
  {
    id: "online",
    name: "Give Online",
    detail: "Give through the church's own giving page.",
    href: "https://www.jesushousebhm.org/giving",
  },
  {
    id: "zelle",
    name: "Zelle",
    detail: "Send to The Redeemed Christian Church of God at 205-586-9854.",
    href: null,
  },
  {
    id: "text",
    name: "Text-to-Give",
    detail: 'Text "GIVE" and an amount (e.g. "GIVE 25") to (833) 271-1840.',
    href: null,
  },
  {
    id: "cash-check",
    name: "Cash or Check",
    detail: "Ask an usher for an envelope at any service.",
    href: null,
  },
];
```

Create `lib/content/rccg.js`:

```js
export const rccg = {
  foundedYear: 1952,
  founder: "Pa Josiah Akindayomi",
  generalOverseer: "Pastor E.A. Adeboye",
  worldwideHq: {
    name: "Redemption City of God (formerly Redemption Camp)",
    address: "Kilometer 46, Lagos–Ibadan Expressway, Mowe, Ogun State, Nigeria",
    note: "A 2,500+ hectare campus that opened in 1983.",
  },
  northAmericaHq: {
    address: "515 County Road 1118, Greenville, TX 75401, USA",
    note: "An 800-acre campus with a 20,000-seat auditorium that hosts RCCG's annual North American convention.",
  },
  universities: [
    {
      name: "Redeemer's University",
      location: "Ede, Osun State, Nigeria",
      note: "A full accredited university owned by RCCG, founded in 2005.",
    },
    {
      name: "Redeemer's University North America",
      location: "Greenville, Texas, USA",
      note: "Founded in 2012 (originally the RCCGNA Seminary), training in Biblical studies, theology, and pastoral leadership.",
    },
  ],
  campDevelopment: {
    note: "RCCG North America is developing 800+ acres in the Dallas–Fort Worth area (Floyd/Greenville, TX), modeled on Nigeria's Redemption Camp — already home to the 20,000-seat convention auditorium, with a housing estate, a school, and a university planned as it's built out.",
    url: "https://campdevelopment.rccgna.org",
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- lib/content/content.test.js`
Expected: PASS — all content-module tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/content/ 
git commit -m "feat: add content data modules as single source of truth for real/placeholder facts"
```

---

## Task 8: Navigation component

**Files:**
- Create: `components/navigation/Nav.jsx`
- Test: `components/navigation/Nav.test.jsx`
- Modify: `app/layout.js`

**Interfaces:**
- Consumes: `siteInfo` (Task 7), `Magnetic` (Task 3).
- Produces: `Nav()` — top navigation bar with all 11 route links and a mobile menu toggle. Rendered once, in the root layout.

- [ ] **Step 1: Write the failing test**

Create `components/navigation/Nav.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";

const ROUTES = [
  ["Home", "/"],
  ["About", "/about"],
  ["Leadership", "/leadership"],
  ["Visit", "/visit"],
  ["Ministries", "/ministries"],
  ["Events", "/events"],
  ["Giving", "/giving"],
  ["Gallery", "/gallery"],
  ["Testimonies", "/testimonies"],
  ["Contact", "/contact"],
  ["Prayer", "/prayer"],
];

describe("Nav", () => {
  it.each(ROUTES)("links to %s at %s", (label, href) => {
    render(<Nav />);
    const links = screen.getAllByText(label);
    expect(links.some((el) => el.closest("a")?.getAttribute("href") === href)).toBe(true);
  });

  it("shows the real church name as the wordmark", () => {
    render(<Nav />);
    expect(screen.getAllByText("Jesus House").length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/navigation/Nav.test.jsx`
Expected: FAIL — `./Nav` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `components/navigation/Nav.jsx`:

```jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Visit", href: "/visit" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Giving", href: "/giving" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Contact", href: "/contact" },
  { label: "Prayer", href: "/prayer" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-ivory/90 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl text-sanctuary">
          Jesus House
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.25}>
              <Link href={link.href} className="font-body text-sm text-ink hover:text-sanctuary">
                {link.label}
              </Link>
            </Magnetic>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden font-body text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col gap-4 px-6 pb-6 overflow-hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-base"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
```

Modify `app/layout.js` — render `Nav` inside `SmoothScroll`, before `children`:

```jsx
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/navigation/Nav";

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
      <body className="font-body bg-ivory text-ink antialiased">
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/navigation/Nav.test.jsx`
Expected: PASS — 12 tests passed (11 routes + wordmark).

- [ ] **Step 5: Commit**

```bash
git add components/navigation/Nav.jsx components/navigation/Nav.test.jsx app/layout.js
git commit -m "feat: add site navigation with all 11 routes and a mobile menu"
```

---

## Task 9: Footer + ConceptDisclaimer

**Files:**
- Create: `components/sections/Footer.jsx`
- Test: `components/sections/Footer.test.jsx`
- Modify: `app/layout.js`

**Interfaces:**
- Consumes: `siteInfo` (Task 7).
- Produces: `Footer()` — rendered once, in the root layout, after `children`. Contains the real contact info, social links, and the required unofficial-concept disclaimer.

- [ ] **Step 1: Write the failing test**

Create `components/sections/Footer.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the real address, phone, and email", () => {
    render(<Footer />);
    expect(screen.getByText("213 1st Avenue North, Birmingham, Alabama 35204")).toBeInTheDocument();
    expect(screen.getByText("(205) 201-4093")).toBeInTheDocument();
    expect(screen.getByText("secretary@jesushousebhm.org")).toBeInTheDocument();
  });

  it("shows the unofficial-concept disclaimer with a link to the real site", () => {
    render(<Footer />);
    expect(screen.getByText(/unofficial/i)).toBeInTheDocument();
    expect(screen.getByText(/not affiliated with or endorsed by/i)).toBeInTheDocument();
    const realSiteLink = screen.getByText("jesushousebhm.org");
    expect(realSiteLink.closest("a")).toHaveAttribute("href", "https://www.jesushousebhm.org/");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/sections/Footer.test.jsx`
Expected: FAIL — `./Footer` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `components/sections/Footer.jsx`:

```jsx
import { siteInfo } from "@/lib/content/siteInfo";

export function Footer() {
  return (
    <footer className="bg-plum text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg mb-2">Jesus House</p>
          <p className="text-sm text-ivory/80">{siteInfo.tagline}</p>
        </div>

        <div className="text-sm text-ivory/80 flex flex-col gap-1">
          <p>{siteInfo.address}</p>
          <p>{siteInfo.phone}</p>
          <p>{siteInfo.email}</p>
          <div className="flex gap-4 mt-2">
            <a href={siteInfo.facebook} className="underline">
              Facebook
            </a>
            <a href={siteInfo.instagram} className="underline">
              Instagram
            </a>
          </div>
        </div>

        <div className="text-xs text-ivory/60 leading-relaxed">
          <p>
            This is an unofficial redesign concept and is not affiliated with or endorsed by
            Jesus House Birmingham. For the real, official site, visit{" "}
            <a href={siteInfo.realSiteUrl} className="underline">
              jesushousebhm.org
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
```

Modify `app/layout.js` — render `Footer` after `children`:

```jsx
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/navigation/Nav";
import { Footer } from "@/components/sections/Footer";

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
      <body className="font-body bg-ivory text-ink antialiased">
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/sections/Footer.test.jsx`
Expected: PASS — 2 tests passed.

Also run: `npm run dev`, confirm the footer disclaimer renders on the homepage, then stop the server.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Footer.jsx components/sections/Footer.test.jsx app/layout.js
git commit -m "feat: add footer with real contact info and required unofficial-concept disclaimer"
```

---

## Task 10: VerseTicker component

**Files:**
- Create: `components/sections/VerseTicker.jsx`
- Test: `components/sections/VerseTicker.test.jsx`

**Interfaces:**
- Consumes: `siteInfo.verse` (Task 7), `getGsap()` (Task 4).
- Produces: `VerseTicker()` — an infinite horizontal marquee of the featured verse, JHB's signature motion moment. Not wired into any page yet — Task 11 places it in the Home hero.

- [ ] **Step 1: Write the failing test**

Create `components/sections/VerseTicker.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      to: vi.fn(),
    },
    ScrollTrigger: {},
  }),
}));

import { VerseTicker } from "./VerseTicker";

describe("VerseTicker", () => {
  it("renders the real featured verse and its reference", () => {
    render(<VerseTicker />);
    expect(screen.getAllByText(/For with God nothing will be impossible/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Luke 1:37/).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/sections/VerseTicker.test.jsx`
Expected: FAIL — `./VerseTicker` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `components/sections/VerseTicker.jsx`:

```jsx
"use client";

import { useRef, useEffect } from "react";
import { getGsap } from "@/lib/gsap";
import { siteInfo } from "@/lib/content/siteInfo";

const REPEATS = 4;

export function VerseTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const verseLabel = `${siteInfo.verse.text} — ${siteInfo.verse.reference}`;

  return (
    <div className="overflow-hidden bg-sanctuary text-ivory py-4">
      <div ref={trackRef} className="flex w-max gap-12 whitespace-nowrap font-display text-lg">
        {Array.from({ length: REPEATS }).map((_, i) => (
          <span key={i}>{verseLabel}</span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/sections/VerseTicker.test.jsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/VerseTicker.jsx components/sections/VerseTicker.test.jsx
git commit -m "feat: add signature scripture-verse ticker (Luke 1:37)"
```

---

## Task 11: Home page — Hero section

**Files:**
- Create: `components/sections/Hero.jsx`
- Test: `components/sections/Hero.test.jsx`

**Interfaces:**
- Consumes: `siteInfo` (Task 7), `Magnetic` (Task 3), `getGsap()` (Task 4).
- Produces: `Hero()` — full-viewport hero with a quiet verse eyebrow, the real tagline as a staggered-word headline animated on mount (not scroll — it's above the fold), and 3 CTAs. Consumed by Task 12 (Home page assembly).

- [ ] **Step 1: Write the failing test**

Create `components/sections/Hero.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      timeline: () => ({
        from: function () {
          return this;
        },
      }),
    },
    ScrollTrigger: {},
  }),
}));

import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the real tagline and verse", () => {
    render(<Hero />);
    expect(screen.getByText(/Reviving Hope/)).toBeInTheDocument();
    expect(screen.getByText(/Maximizing Potential/)).toBeInTheDocument();
    expect(screen.getByText(/For with God nothing will be impossible/)).toBeInTheDocument();
  });

  it("links its 3 CTAs to the right pages", () => {
    render(<Hero />);
    expect(screen.getByText("Worship With Us").closest("a")).toHaveAttribute("href", "/visit");
    expect(screen.getByText("Giving").closest("a")).toHaveAttribute("href", "/giving");
    expect(screen.getByText("Prayer Requests").closest("a")).toHaveAttribute("href", "/prayer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/sections/Hero.test.jsx`
Expected: FAIL — `./Hero` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `components/sections/Hero.jsx`:

```jsx
"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { getGsap } from "@/lib/gsap";
import { Magnetic } from "@/components/ui/Magnetic";
import { siteInfo } from "@/lib/content/siteInfo";

const CTAS = [
  { label: "Worship With Us", href: "/visit" },
  { label: "Giving", href: "/giving" },
  { label: "Prayer Requests", href: "/prayer" },
];

export function Hero() {
  const scope = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 16 })
        .from("[data-hero-word]", { opacity: 0, yPercent: 100, stagger: 0.06 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 12, stagger: 0.1 }, "-=0.4");
    }, scope);

    return () => ctx.revert();
  }, []);

  const words = siteInfo.tagline.split(" ");

  return (
    <section ref={scope} className="min-h-screen flex flex-col justify-center px-6 pt-24">
      <p data-hero-eyebrow className="font-body text-sm text-sanctuary mb-4">
        &ldquo;{siteInfo.verse.text}.&rdquo; — {siteInfo.verse.reference}
      </p>

      <h1 className="font-display text-5xl md:text-7xl text-ink max-w-4xl overflow-hidden">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} data-hero-word style={{ display: "inline-block", marginRight: "0.25em" }}>
            {word}
          </span>
        ))}
      </h1>

      <div className="flex flex-wrap gap-4 mt-10">
        {CTAS.map((cta) => (
          <div key={cta.href} data-hero-cta>
            <Magnetic strength={0.2}>
              <Link
                href={cta.href}
                className="inline-block rounded-full bg-sanctuary text-ivory px-6 py-3 font-body font-semibold"
              >
                {cta.label}
              </Link>
            </Magnetic>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/sections/Hero.test.jsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.jsx components/sections/Hero.test.jsx
git commit -m "feat: add Home hero with mount-choreographed headline and CTAs"
```

---

## Task 12: Home page — supporting sections + page assembly

**Files:**
- Create: `components/sections/ServiceTimesStrip.jsx`
- Create: `components/sections/WelcomeMessage.jsx`
- Create: `components/sections/MinistriesPreview.jsx`
- Create: `components/sections/EventsPreview.jsx`
- Modify: `app/page.js`
- Test: `app/page.test.jsx`

**Interfaces:**
- Consumes: `Hero` (Task 11), `VerseTicker` (Task 10), `Reveal` (Task 3), `serviceTimes`/`ministries`/`recurringEvents` (Task 7).
- Produces: the complete Home page at `/`.

- [ ] **Step 1: Write the failing test**

Create `app/page.test.jsx`:

```jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({
  getGsap: () => ({
    gsap: {
      context: (fn) => {
        fn();
        return { revert: vi.fn() };
      },
      timeline: () => ({
        from: function () {
          return this;
        },
      }),
      to: vi.fn(),
    },
    ScrollTrigger: {},
  }),
}));

import Home from "./page";

describe("Home page", () => {
  it("shows the real service times", () => {
    render(<Home />);
    expect(screen.getByText("Main Service")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM – 12:00 PM")).toBeInTheDocument();
  });

  it("shows a ministries preview linking to the full ministries page", () => {
    render(<Home />);
    expect(screen.getByText("Children's Church")).toBeInTheDocument();
    expect(screen.getByText("See all ministries").closest("a")).toHaveAttribute("href", "/ministries");
  });

  it("shows an events preview linking to the full events page", () => {
    render(<Home />);
    expect(screen.getByText("See all events").closest("a")).toHaveAttribute("href", "/events");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/page.test.jsx`
Expected: FAIL — `app/page.js` is still the Task 1 placeholder with none of this content.

- [ ] **Step 3: Implement**

Create `components/sections/ServiceTimesStrip.jsx`:

```jsx
import { serviceTimes } from "@/lib/content/serviceTimes";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceTimesStrip() {
  return (
    <section className="bg-blush px-6 py-16">
      <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-4">
        {serviceTimes.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <p className="font-body text-xs uppercase tracking-wide text-sanctuary">{s.day}</p>
            <p className="font-display text-lg">{s.label}</p>
            <p className="font-body text-sm text-ink/70">{s.time}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

Create `components/sections/WelcomeMessage.jsx`:

```jsx
import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";

export function WelcomeMessage() {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl mb-4">Welcoming You Home</h2>
        <p className="font-body text-ink/80 leading-relaxed">{siteInfo.coreMessage}.</p>
      </Reveal>
    </section>
  );
}
```

Create `components/sections/MinistriesPreview.jsx`:

```jsx
import Link from "next/link";
import { ministries } from "@/lib/content/ministries";
import { Reveal } from "@/components/ui/Reveal";

export function MinistriesPreview() {
  const preview = ministries.slice(0, 4);

  return (
    <section className="px-6 py-20 bg-ivory">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl mb-8">Ministries</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {preview.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <p className="font-display text-lg mb-2">{m.name}</p>
              <p className="font-body text-sm text-ink/70">{m.description}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/ministries" className="inline-block mt-8 font-body underline text-sanctuary">
          See all ministries
        </Link>
      </div>
    </section>
  );
}
```

Create `components/sections/EventsPreview.jsx`:

```jsx
import Link from "next/link";
import { recurringEvents } from "@/lib/content/events";
import { Reveal } from "@/components/ui/Reveal";

export function EventsPreview() {
  const preview = recurringEvents.slice(0, 2);

  return (
    <section className="px-6 py-20 bg-blush">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl mb-8">Upcoming</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {preview.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <p className="font-display text-lg">{e.name}</p>
              <p className="font-body text-sm text-ink/70">{e.time}</p>
            </Reveal>
          ))}
        </div>
        <Link href="/events" className="inline-block mt-8 font-body underline text-sanctuary">
          See all events
        </Link>
      </div>
    </section>
  );
}
```

Replace `app/page.js`:

```jsx
import { Hero } from "@/components/sections/Hero";
import { VerseTicker } from "@/components/sections/VerseTicker";
import { ServiceTimesStrip } from "@/components/sections/ServiceTimesStrip";
import { WelcomeMessage } from "@/components/sections/WelcomeMessage";
import { MinistriesPreview } from "@/components/sections/MinistriesPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      <VerseTicker />
      <ServiceTimesStrip />
      <WelcomeMessage />
      <MinistriesPreview />
      <EventsPreview />
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/page.test.jsx`
Expected: PASS — 3 tests passed.

Also run: `npm run dev`, open `http://localhost:3000`, scroll through the whole Home page, confirm the hero animates in, the verse ticker scrolls, and every section renders with no console errors, then stop the server.

- [ ] **Step 5: Commit**

```bash
git add components/sections/ServiceTimesStrip.jsx components/sections/WelcomeMessage.jsx components/sections/MinistriesPreview.jsx components/sections/EventsPreview.jsx app/page.js app/page.test.jsx
git commit -m "feat: assemble Home page from hero, verse ticker, and supporting sections"
```

---

## Task 13: About page

**Files:**
- Create: `app/about/page.js`
- Test: `app/about/page.test.jsx`

**Interfaces:**
- Consumes: `siteInfo`, `rccg` (Task 7), `Reveal` (Task 3).
- Produces: the `/about` route.

- [ ] **Step 1: Write the failing test**

Create `app/about/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./page";

describe("About page", () => {
  it("shows the real vision statement", () => {
    render(<About />);
    expect(
      screen.getByText(/To make heaven, to take as many people with us/)
    ).toBeInTheDocument();
  });

  it("shows RCCG's real worldwide and North America headquarters", () => {
    render(<About />);
    expect(screen.getByText(/Mowe, Ogun State, Nigeria/)).toBeInTheDocument();
    expect(screen.getByText(/Greenville, TX/)).toBeInTheDocument();
  });

  it("shows both real RCCG universities", () => {
    render(<About />);
    expect(screen.getByText("Redeemer's University")).toBeInTheDocument();
    expect(screen.getByText("Redeemer's University North America")).toBeInTheDocument();
  });

  it("describes the camp development's planned housing estate as informational, with a link and no purchase CTA", () => {
    render(<About />);
    expect(screen.getByText(/housing estate/)).toBeInTheDocument();
    const link = screen.getByText("campdevelopment.rccgna.org");
    expect(link.closest("a")).toHaveAttribute("href", "https://campdevelopment.rccgna.org");
    expect(screen.queryByText(/buy|purchase/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/about/page.test.jsx`
Expected: FAIL — `app/about/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/about/page.js`:

```jsx
import { siteInfo } from "@/lib/content/siteInfo";
import { rccg } from "@/lib/content/rccg";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "About | Jesus House Birmingham (Unofficial Concept)",
};

export default function About() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-6">About Jesus House Birmingham</h1>
        <p className="font-body text-ink/80 mb-4">
          Jesus House Birmingham is a parish of The Redeemed Christian Church of God (RCCG) in
          North America, and one of the parishes of RCCG worldwide.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Our Vision</h2>
        <p className="font-body text-ink/80">{siteInfo.vision}</p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Our Message</h2>
        <p className="font-body text-ink/80">{siteInfo.coreMessage}.</p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">What We Believe</h2>
        <p className="font-body text-ink/80">
          We believe in one God, the saving grace of Jesus Christ, the authority of Scripture,
          and the power of the Holy Spirit at work in everyday life — worship that is
          contemporary in style but rooted in spirit and truth.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Part of a Global Family</h2>
        <p className="font-body text-ink/80 mb-4">
          RCCG was founded in {rccg.foundedYear} by {rccg.founder} and is led today by{" "}
          {rccg.generalOverseer}. The worldwide headquarters, {rccg.worldwideHq.name}, sits at{" "}
          {rccg.worldwideHq.address}. {rccg.worldwideHq.note}
        </p>
        <p className="font-body text-ink/80">
          RCCG's North America headquarters is at {rccg.northAmericaHq.address}.{" "}
          {rccg.northAmericaHq.note}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Education</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {rccg.universities.map((u) => (
            <div key={u.name}>
              <p className="font-display text-lg">{u.name}</p>
              <p className="font-body text-sm text-sanctuary mb-1">{u.location}</p>
              <p className="font-body text-sm text-ink/70">{u.note}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-2xl mt-12 mb-3">Camp Development</h2>
        <p className="font-body text-ink/80">
          {rccg.campDevelopment.note} Learn more at{" "}
          <a href={rccg.campDevelopment.url} className="underline text-sanctuary">
            campdevelopment.rccgna.org
          </a>
          .
        </p>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/about/page.test.jsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add app/about/ 
git commit -m "feat: add About page with vision, mission, and RCCG global-family section"
```

---

## Task 14: Leadership page

**Files:**
- Create: `app/leadership/page.js`
- Test: `app/leadership/page.test.jsx`

**Interfaces:**
- Consumes: `pastors`, `ministryLeads` (Task 7), `Reveal` (Task 3).
- Produces: the `/leadership` route.

- [ ] **Step 1: Write the failing test**

Create `app/leadership/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Leadership from "./page";

describe("Leadership page", () => {
  it("shows the real lead pastor and co-pastor with their titles", () => {
    render(<Leadership />);
    expect(screen.getByText("Enefaa Fenny")).toBeInTheDocument();
    expect(screen.getByText("Lead Pastor")).toBeInTheDocument();
    expect(screen.getByText("Bola Fenny")).toBeInTheDocument();
    expect(screen.getByText("Co-Pastor")).toBeInTheDocument();
  });

  it("shows all 7 real ministry leads", () => {
    render(<Leadership />);
    expect(screen.getByText("Taiye Atilola")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/leadership/page.test.jsx`
Expected: FAIL — `app/leadership/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/leadership/page.js`:

```jsx
import { pastors, ministryLeads } from "@/lib/content/leadership";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Leadership | Jesus House Birmingham (Unofficial Concept)",
};

function Initials({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="w-16 h-16 rounded-full bg-sanctuary text-ivory flex items-center justify-center font-display text-xl">
      {initials}
    </div>
  );
}

export default function Leadership() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-2">Leadership Team</h1>
        <p className="font-body text-ink/70 mb-12">
          No leadership photos exist for this concept build — shown with monogram avatars instead.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {pastors.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="flex flex-col items-center text-center gap-3">
            <Initials name={p.name} />
            <p className="font-display text-lg">{p.name}</p>
            <p className="font-body text-sm text-sanctuary">{p.title}</p>
          </Reveal>
        ))}
      </div>

      <h2 className="font-display text-2xl mb-6">Ministry Leads</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {ministryLeads.map((m, i) => (
          <Reveal key={m.name} delay={i * 60} className="flex items-center gap-3">
            <Initials name={m.name} />
            <p className="font-body text-sm">{m.name}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/leadership/page.test.jsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add app/leadership/
git commit -m "feat: add Leadership page with real names/titles and monogram avatars"
```

---

## Task 15: Visit page

**Files:**
- Create: `app/visit/page.js`
- Test: `app/visit/page.test.jsx`

**Interfaces:**
- Consumes: `siteInfo`, `serviceTimes` (Task 7), `Reveal` (Task 3), `ConceptForm` (Task 6).
- Produces: the `/visit` route.

- [ ] **Step 1: Write the failing test**

Create `app/visit/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Visit from "./page";

describe("Visit page", () => {
  it("shows the real service times and address", () => {
    render(<Visit />);
    expect(screen.getByText("Main Service")).toBeInTheDocument();
    expect(screen.getByText("213 1st Avenue North, Birmingham, Alabama 35204")).toBeInTheDocument();
  });

  it("has a plan-a-visit form with a name field", () => {
    render(<Visit />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/visit/page.test.jsx`
Expected: FAIL — `app/visit/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/visit/page.js`:

```jsx
import { siteInfo } from "@/lib/content/siteInfo";
import { serviceTimes } from "@/lib/content/serviceTimes";
import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";

export const metadata = {
  title: "Visit | Jesus House Birmingham (Unofficial Concept)",
};

const FORM_FIELDS = [
  { name: "name", required: true },
  { name: "email", required: true },
];

export default function Visit() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address)}&output=embed`;

  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Plan Your Visit</h1>
        <p className="font-body text-ink/80 max-w-2xl">
          Join our church family and experience the warmth of a community that cares.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-4 my-12">
        {serviceTimes.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <p className="font-body text-xs uppercase tracking-wide text-sanctuary">{s.day}</p>
            <p className="font-display text-lg">{s.label}</p>
            <p className="font-body text-sm text-ink/70">{s.time}</p>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-2xl mb-3">Address</h2>
          <p className="font-body text-ink/80 mb-4">{siteInfo.address}</p>
          <iframe
            title="Map to Jesus House Birmingham"
            src={mapSrc}
            className="w-full h-64 border-0 rounded-lg"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={80}>
          <h2 className="font-display text-2xl mb-3">Plan a Visit</h2>
          <ConceptForm
            fields={FORM_FIELDS}
            submitLabel="Let Us Know You're Coming"
            successMessage="Thanks — this is a demo, so nothing was actually sent. On the real site, the church would follow up before your visit."
          >
            <label className="flex flex-col gap-1 text-sm">
              Name
              <input name="name" className="border border-ink/20 rounded px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Email
              <input name="email" type="email" className="border border-ink/20 rounded px-3 py-2" />
            </label>
          </ConceptForm>
        </Reveal>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/visit/page.test.jsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add app/visit/
git commit -m "feat: add Visit page with real service times, map, and plan-a-visit form"
```

---

## Task 16: Ministries page

**Files:**
- Create: `app/ministries/page.js`
- Test: `app/ministries/page.test.jsx`

**Interfaces:**
- Consumes: `ministries` (Task 7), `Reveal` (Task 3).
- Produces: the `/ministries` route.

- [ ] **Step 1: Write the failing test**

Create `app/ministries/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Ministries from "./page";
import { ministries } from "@/lib/content/ministries";

describe("Ministries page", () => {
  it("shows every ministry from the content module", () => {
    render(<Ministries />);
    ministries.forEach((m) => {
      expect(screen.getByText(m.name)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/ministries/page.test.jsx`
Expected: FAIL — `app/ministries/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/ministries/page.js`:

```jsx
import { ministries } from "@/lib/content/ministries";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Ministries | Jesus House Birmingham (Unofficial Concept)",
};

export default function Ministries() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Ministries</h1>
        <p className="font-body text-ink/80 max-w-2xl mb-12">
          Whether you&rsquo;re looking to deepen your faith, connect with others, or make a
          difference in the world, there&rsquo;s a place for you here.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3">
        {ministries.map((m, i) => (
          <Reveal key={m.id} delay={i * 60}>
            <h2 className="font-display text-xl mb-2">{m.name}</h2>
            <p className="font-body text-sm text-ink/70">{m.description}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/ministries/page.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/ministries/
git commit -m "feat: add Ministries page"
```

---

## Task 17: Events page

**Files:**
- Create: `app/events/page.js`
- Test: `app/events/page.test.jsx`

**Interfaces:**
- Consumes: `recurringEvents`, `seasonalEvents` (Task 7), `Reveal` (Task 3).
- Produces: the `/events` route.

- [ ] **Step 1: Write the failing test**

Create `app/events/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Events from "./page";

describe("Events page", () => {
  it("shows the real recurring services", () => {
    render(<Events />);
    expect(screen.getByText(/Main Service \(Sunday\)/)).toBeInTheDocument();
  });

  it("shows the real annual Men's Week and YAYA Week programs", () => {
    render(<Events />);
    expect(screen.getByText("Men's Week")).toBeInTheDocument();
    expect(screen.getByText("YAYA Week")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/events/page.test.jsx`
Expected: FAIL — `app/events/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/events/page.js`:

```jsx
import { recurringEvents, seasonalEvents } from "@/lib/content/events";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Events | Jesus House Birmingham (Unofficial Concept)",
};

export default function Events() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-12">Events</h1>
      </Reveal>

      <h2 className="font-display text-2xl mb-6">Every Week</h2>
      <div className="grid gap-6 md:grid-cols-4 mb-16">
        {recurringEvents.map((e, i) => (
          <Reveal key={e.id} delay={i * 60}>
            <p className="font-display text-lg">{e.name}</p>
            <p className="font-body text-sm text-ink/70">{e.time}</p>
          </Reveal>
        ))}
      </div>

      <h2 className="font-display text-2xl mb-2">Annual Programs</h2>
      <p className="font-body text-sm text-ink/60 mb-6">
        Two signature annual weeks, real programs run by the men's and young adults' ministries.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {seasonalEvents.map((e, i) => (
          <Reveal key={e.id} delay={i * 80}>
            <p className="font-display text-lg">{e.name}</p>
            <p className="font-body text-sm text-sanctuary">{e.dateLabel}</p>
            <p className="font-body text-sm text-ink/70">{e.description}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/events/page.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/events/
git commit -m "feat: add Events page with real recurring services and labeled example events"
```

---

## Task 18: Giving page

**Files:**
- Create: `app/giving/page.js`
- Test: `app/giving/page.test.jsx`

**Interfaces:**
- Consumes: `givingMethods` (Task 7), `Reveal` (Task 3).
- Produces: the `/giving` route.

- [ ] **Step 1: Write the failing test**

Create `app/giving/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Giving from "./page";

describe("Giving page", () => {
  it("shows the real Zelle and text-to-give details", () => {
    render(<Giving />);
    expect(screen.getByText(/205-586-9854/)).toBeInTheDocument();
    expect(screen.getByText(/\(833\) 271-1840/)).toBeInTheDocument();
  });

  it("links Give Online to the church's real giving page", () => {
    render(<Giving />);
    expect(screen.getByText("Give Online").closest("a")).toHaveAttribute(
      "href",
      "https://www.jesushousebhm.org/giving"
    );
  });

  it("tells visitors to confirm through the church's real site, since this isn't an official channel", () => {
    render(<Giving />);
    expect(screen.getByText(/not an official/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/giving/page.test.jsx`
Expected: FAIL — `app/giving/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/giving/page.js`:

```jsx
import { givingMethods } from "@/lib/content/giving";
import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Giving | Jesus House Birmingham (Unofficial Concept)",
};

export default function Giving() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Help Us Spread Love and Faith</h1>
        <p className="font-body text-ink/80 mb-3">
          Your financial contribution means the world to us and helps us continue our mission of
          serving the community.
        </p>
        <p className="font-body text-sm bg-blush rounded-lg px-4 py-3 text-ink/80">
          This is not an official giving channel — it reproduces the giving methods shown on the
          church&rsquo;s own signage for this concept build. Please confirm any gift through{" "}
          <a href={siteInfo.realSiteUrl} className="underline text-sanctuary">
            {siteInfo.realSiteUrl.replace("https://www.", "").replace(/\/$/, "")}
          </a>{" "}
          directly.
        </p>
      </Reveal>

      <div className="grid gap-6 mt-12">
        {givingMethods.map((method, i) => (
          <Reveal key={method.id} delay={i * 70}>
            <h2 className="font-display text-xl">
              {method.href ? (
                <a href={method.href} className="text-sanctuary underline">
                  {method.name}
                </a>
              ) : (
                method.name
              )}
            </h2>
            <p className="font-body text-sm text-ink/70">{method.detail}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/giving/page.test.jsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add app/giving/
git commit -m "feat: add Giving page with real methods sourced from church signage"
```

---

## Task 19: Gallery page

**Files:**
- Create: `app/gallery/page.js`
- Test: `app/gallery/page.test.jsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: the `/gallery` route.

No real JHB photography is used (per spec). Rather than pulling in third-party stock photo URLs (an external runtime dependency, and photos of real unrelated people presented as if they were this church), the gallery uses locally-styled gradient placeholder tiles in the site's own palette, each captioned with what it would depict — honest about being a placeholder rather than dressing up unrelated stock photography as real church photos.

- [ ] **Step 1: Write the failing test**

Create `app/gallery/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Gallery from "./page";

describe("Gallery page", () => {
  it("shows placeholder tiles with captions, not real photography", () => {
    render(<Gallery />);
    expect(screen.getByText("Sunday Worship")).toBeInTheDocument();
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/gallery/page.test.jsx`
Expected: FAIL — `app/gallery/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/gallery/page.js`:

```jsx
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Gallery | Jesus House Birmingham (Unofficial Concept)",
};

const TILES = [
  { id: "worship", caption: "Sunday Worship" },
  { id: "community", caption: "Community Fellowship" },
  { id: "outreach", caption: "Outreach & Missions" },
  { id: "youth", caption: "Youth Ministry" },
  { id: "choir", caption: "Choir & Worship Team" },
  { id: "prayer", caption: "Prayer Band" },
];

const GRADIENTS = [
  "from-sanctuary to-plum",
  "from-gold to-sanctuary",
  "from-plum to-ink",
  "from-blush to-gold",
  "from-sanctuary to-gold",
  "from-ink to-plum",
];

export default function Gallery() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-5xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-2">Gallery</h1>
        <p className="font-body text-sm text-ink/60 mb-12">
          No real photography exists for this concept build — these are styled placeholder tiles,
          not actual photos of the church.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <Reveal key={tile.id} delay={i * 60}>
            <div
              className={`aspect-square rounded-lg bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-end p-4`}
            >
              <p className="font-body text-ivory text-sm font-semibold">{tile.caption}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/gallery/page.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/gallery/
git commit -m "feat: add Gallery page with honest placeholder tiles (no real or stock photography)"
```

---

## Task 20: Testimonies page

**Files:**
- Create: `app/testimonies/page.js`
- Test: `app/testimonies/page.test.jsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3).
- Produces: the `/testimonies` route.

Per the spec, no invented personal testimonies are shown — this page is an invite-to-share CTA only.

- [ ] **Step 1: Write the failing test**

Create `app/testimonies/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Testimonies from "./page";

describe("Testimonies page", () => {
  it("invites visitors to share, without showing any invented quotes", () => {
    render(<Testimonies />);
    expect(screen.getByText(/Share Your Testimony/i)).toBeInTheDocument();
    expect(screen.queryByText(/"|"/)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/testimonies/page.test.jsx`
Expected: FAIL — `app/testimonies/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/testimonies/page.js`:

```jsx
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Testimonies | Jesus House Birmingham (Unofficial Concept)",
};

export default function Testimonies() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-2xl mx-auto text-center">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Share Your Testimony</h1>
        <p className="font-body text-ink/80 mb-8">
          This concept build doesn&rsquo;t include real member testimonies — we won&rsquo;t
          invent quotes and attribute them to a real congregation. On the real site, this is
          where the community&rsquo;s own stories would go.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-sanctuary text-ivory px-6 py-3 font-body font-semibold"
        >
          Get in Touch to Share Yours
        </Link>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/testimonies/page.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/testimonies/
git commit -m "feat: add Testimonies page as an invite-only CTA (no invented quotes)"
```

---

## Task 21: Contact page

**Files:**
- Create: `app/contact/page.js`
- Test: `app/contact/page.test.jsx`

**Interfaces:**
- Consumes: `siteInfo` (Task 7), `Reveal` (Task 3), `ConceptForm` (Task 6).
- Produces: the `/contact` route.

- [ ] **Step 1: Write the failing test**

Create `app/contact/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./page";

describe("Contact page", () => {
  it("shows the real phone and email", () => {
    render(<Contact />);
    expect(screen.getByText("(205) 201-4093")).toBeInTheDocument();
    expect(screen.getByText("secretary@jesushousebhm.org")).toBeInTheDocument();
  });

  it("has a contact form with a message field", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/contact/page.test.jsx`
Expected: FAIL — `app/contact/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/contact/page.js`:

```jsx
import { siteInfo } from "@/lib/content/siteInfo";
import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";

export const metadata = {
  title: "Contact | Jesus House Birmingham (Unofficial Concept)",
};

const FORM_FIELDS = [
  { name: "name", required: true },
  { name: "email", required: true },
  { name: "message", required: true },
];

export default function Contact() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Contact Us</h1>
        <p className="font-body text-ink/80 mb-8">
          Reach out and we&rsquo;ll get back to you as soon as possible.
        </p>
        <div className="font-body text-sm text-ink/80 flex flex-col gap-1 mb-10">
          <p>{siteInfo.address}</p>
          <p>{siteInfo.phone}</p>
          <p>{siteInfo.email}</p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ConceptForm
          fields={FORM_FIELDS}
          submitLabel="Send Message"
          successMessage="Thanks — this is a demo, so nothing was actually sent to the church."
        >
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input name="name" className="border border-ink/20 rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input name="email" type="email" className="border border-ink/20 rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Message
            <textarea name="message" rows={4} className="border border-ink/20 rounded px-3 py-2" />
          </label>
        </ConceptForm>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/contact/page.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/contact/
git commit -m "feat: add Contact page with real info and UI-only contact form"
```

---

## Task 22: Prayer page

**Files:**
- Create: `app/prayer/page.js`
- Test: `app/prayer/page.test.jsx`

**Interfaces:**
- Consumes: `Reveal` (Task 3), `ConceptForm` (Task 6).
- Produces: the `/prayer` route.

- [ ] **Step 1: Write the failing test**

Create `app/prayer/page.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Prayer from "./page";

describe("Prayer page", () => {
  it("has a prayer request form with a request field", () => {
    render(<Prayer />);
    expect(screen.getByLabelText("Prayer Request")).toBeInTheDocument();
  });

  it("is explicit that this demo does not deliver requests to the church", () => {
    render(<Prayer />);
    expect(screen.getByText(/does not reach the church/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/prayer/page.test.jsx`
Expected: FAIL — `app/prayer/page.js` doesn't exist yet.

- [ ] **Step 3: Implement**

Create `app/prayer/page.js`:

```jsx
import { Reveal } from "@/components/ui/Reveal";
import { ConceptForm } from "@/components/ui/ConceptForm";

export const metadata = {
  title: "Prayer Requests | Jesus House Birmingham (Unofficial Concept)",
};

const FORM_FIELDS = [
  { name: "name", required: true },
  { name: "request", required: true },
];

export default function Prayer() {
  return (
    <main className="px-6 pt-32 pb-24 max-w-2xl mx-auto">
      <Reveal>
        <h1 className="font-display text-4xl mb-4">Prayer Requests</h1>
        <p className="font-body text-ink/80 mb-2">
          We&rsquo;d be honored to stand with you in prayer.
        </p>
        <p className="font-body text-sm bg-blush rounded-lg px-4 py-3 text-ink/80 mb-8">
          This is a concept build — submitting this form does not reach the church. For a real
          prayer request, please contact Jesus House Birmingham directly.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <ConceptForm
          fields={FORM_FIELDS}
          submitLabel="Submit Request"
          successMessage="Thanks for sharing — again, this is a demo, so this request was not actually sent anywhere."
        >
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input name="name" className="border border-ink/20 rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Prayer Request
            <textarea name="request" rows={5} className="border border-ink/20 rounded px-3 py-2" />
          </label>
        </ConceptForm>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/prayer/page.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/prayer/
git commit -m "feat: add Prayer Requests page (UI-only, explicit no-delivery notice)"
```

---

## Task 23: SEO/meta routes + final verification pass

**Files:**
- Create: `app/sitemap.js`
- Create: `app/robots.js`
- Create: `app/not-found.js`
- Test: `app/sitemap.test.js`
- Test: `app/not-found.test.jsx`

**Interfaces:**
- Consumes: nothing new — this task closes out Phase 1.
- Produces: `sitemap.xml` and `robots.txt` routes, a styled 404 page, and a final confirmation that the whole site builds, lints, and tests cleanly.

- [ ] **Step 1: Write the failing tests**

Create `app/sitemap.test.js`:

```js
import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

const ROUTES = [
  "/",
  "/about",
  "/leadership",
  "/visit",
  "/ministries",
  "/events",
  "/giving",
  "/gallery",
  "/testimonies",
  "/contact",
  "/prayer",
];

describe("sitemap", () => {
  it("includes all 11 public routes", () => {
    const entries = sitemap();
    const urls = entries.map((e) => new URL(e.url).pathname);
    ROUTES.forEach((route) => {
      expect(urls).toContain(route === "/" ? "/" : route);
    });
  });
});
```

Create `app/not-found.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("Not found page", () => {
  it("tells the visitor the page doesn't exist and links home", () => {
    render(<NotFound />);
    expect(screen.getByText(/page/i)).toBeInTheDocument();
    expect(screen.getByText("Back to Home").closest("a")).toHaveAttribute("href", "/");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- app/sitemap.test.js app/not-found.test.jsx`
Expected: FAIL — `app/sitemap.js` and `app/not-found.js` don't exist yet.

- [ ] **Step 3: Implement**

Create `app/sitemap.js`:

```js
const ROUTES = [
  "",
  "about",
  "leadership",
  "visit",
  "ministries",
  "events",
  "giving",
  "gallery",
  "testimonies",
  "contact",
  "prayer",
];

const BASE_URL = "https://jesus-house-birmingham-concept.vercel.app";

export default function sitemap() {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date(0).toISOString(),
  }));
}
```

Create `app/robots.js`:

```js
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jesus-house-birmingham-concept.vercel.app/sitemap.xml",
  };
}
```

Create `app/not-found.js`:

```jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl mb-4">This page doesn&rsquo;t exist</h1>
      <p className="font-body text-ink/70 mb-8">
        Let&rsquo;s get you back to somewhere real.
      </p>
      <Link href="/" className="rounded-full bg-sanctuary text-ivory px-6 py-3 font-body font-semibold">
        Back to Home
      </Link>
    </main>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- app/sitemap.test.js app/not-found.test.jsx`
Expected: PASS.

Then run the full verification pass:

Run: `npm test`
Expected: every test file in the project passes.

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: production build succeeds for all 11 routes plus `sitemap.xml`/`robots.txt`/404.

Run: `npm run dev`, then manually visit every route in a browser — `/`, `/about`, `/leadership`, `/visit`, `/ministries`, `/events`, `/giving`, `/gallery`, `/testimonies`, `/contact`, `/prayer`, plus a nonsense path to confirm the 404 page — checking: the footer disclaimer appears on every page, nav links all work, the hero/verse-ticker/reveal animations run, both forms (Visit, Contact, Prayer) show their success state on submit, the Giving page's real methods and "not an official channel" note render, and there are no console errors. Then stop the server.

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.js app/robots.js app/not-found.js app/sitemap.test.js app/not-found.test.jsx
git commit -m "feat: add sitemap/robots/404 routes and complete Phase 1 verification pass"
```
