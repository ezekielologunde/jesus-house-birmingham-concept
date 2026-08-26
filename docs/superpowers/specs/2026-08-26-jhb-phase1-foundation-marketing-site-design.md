---
project: Jesus House Birmingham Website
type: design-spec
status: approved
last_updated: 2026-08-26
phase: 1 of 5 (Foundation + Marketing Site)
---

# Jesus House Birmingham — Phase 1: Foundation + Marketing Site

## Context

Jesus House Birmingham (JHB) is a parish of The Redeemed Christian Church of God
(RCCG), located at 213 1st Avenue North, Birmingham, AL 35204. Their current site
(jesushousebhm.org) is a thin Wix template with minimal content. This project
rebuilds it as a motion-interactive site modeled on the architecture and design
language of `cac-salvation-center` (a sibling church site already built in this
workspace), but with its own distinct visual identity and content.

**This is an unauthorized portfolio/demo project — not commissioned or endorsed
by Jesus House Birmingham.** The owner has no working relationship with the
church. This governs several decisions throughout this spec: no reuse of the
church's real logo or photography (confirmed a real logo and real hero/leadership
photos exist on their live Wix site, but they stay off-limits here), no forms that
actually deliver to the church's real inbox, and a visible disclaimer that this is
an unofficial redesign concept, not the official site.

This is a **full-platform** effort (marketing site, Supabase backend, admin
console, Stripe store, prayer wall, newsletter, blog/CMS — mirroring
cac-salvation-center's feature set), decomposed into 5 phases. **This spec covers
Phase 1 only.** Phases 2–5 are summarized at the end for context and will each get
their own spec/plan cycle when reached.

## Phase boundaries

**In scope for Phase 1:**
- Project scaffold (Next.js App Router, Tailwind CSS 4, GSAP + ScrollTrigger, Framer Motion, Lenis)
- Design system: color palette, typography, motion primitives
- All public marketing pages listed below
- Contact / Prayer Request / Plan-a-Visit forms with a UI-only success state (no
  real send — see "Forms" section)
- A small, unobtrusive footer disclaimer identifying this as an unofficial
  redesign concept, not affiliated with or endorsed by Jesus House Birmingham
- Deployment to Vercel under a new GitHub repo (only after explicit go-ahead at
  that step — publishing/deploying is confirmed separately, not assumed by this spec)

**Explicitly out of scope for Phase 1** (see "Future phases"):
- Supabase database, admin console, authentication
- Stripe store / online giving processing
- Blog/CMS, newsletter broadcast tool, Instagram feed integration
- Any real form submission delivery (email or database) — this is unauthorized
  demo content and must not reach the church's real inbox

## Research findings (source of truth for real content)

Pulled from jesushousebhm.org (current live site) via web search/fetch on
2026-08-26:

- **Name:** Jesus House Birmingham, a parish of The Redeemed Christian Church of
  God (RCCG); General Overseer Pastor E.A. Adeboye
- **Tagline:** "Reviving Hope and Maximizing Potential"
- **Core message:** "Seeking God with passion and serving men with compassion"
- **Vision statement:** "To make heaven, to take as many people with us, to have a
  member of RCCG in every family of all nations."
- **Featured verse:** "For with God nothing will be impossible" (Luke 1:37)
- **Address:** 213 1st Avenue North, Birmingham, Alabama 35204
- **Phone:** (205) 201-4093
- **Email:** secretary@jesushousebhm.org
- **Social:** Facebook `jesushousebhm`, Instagram `jesushousebirmingham`
- **Service times:**
  - Sunday Rhema Expression: 9:00–9:50 AM
  - Sunday Main Service: 10:00 AM–12:00 PM
  - Sunday French Service: 12:30 PM
  - Wednesday Bible Study: 6:00–7:30 PM
- **Leadership:** Enefaa Fenny (Lead Pastor), Bola Fenny (Co-Pastor), Christy
  Iwuaba (Pastor); ministry leads: Blessing Falola, Eke Ozurumba, Michael Falola,
  Georges Adunlin, Nseobong Okon, Ofonime Okon, Taiye Atilola

**RCCG parent organization** (JHB is a local parish, not a standalone church —
pulled via web search on 2026-08-26, since the user asked for this to be
referenced): founded 1952 by Pa Josiah Akindayomi; current General Overseer
Pastor E.A. Adeboye. Worldwide International Headquarters: Redemption City of
God (formerly Redemption Camp), Kilometer 46, Lagos–Ibadan Expressway, Mowe,
Ogun State, Nigeria — a 2,500+ hectare campus that opened in 1983. North
America Headquarters: 515 County Road 1118, Greenville, TX 75401, USA — an
800-acre campus with a 20,000-seat auditorium that hosts RCCG's annual North
American convention.

**RCCG universities and the North America camp development** (also pulled via
web search on 2026-08-26, per the user's request): RCCG owns **Redeemer's
University (RUN)**, a full accredited university founded in 2005 in Ede, Osun
State, Nigeria. In North America, **Redeemer's University North America
(RUNA)** — founded in 2012, originally as the RCCGNA Seminary — trains in
Biblical studies, theology, and pastoral leadership. Separately, **RCCG North
America Camp Development** is an active, official project on 800+ acres in
the Dallas–Fort Worth area (Floyd/Greenville, TX) modeled on Nigeria's
Redemption Camp; it already includes the 20,000-seat auditorium and hosts the
annual convention, with housing estates, a school, and a university planned as
it's built out (official info: `campdevelopment.rccgna.org`).

**No land-buying/estate-purchase flow is built for this site.** The land
listings that turn up near Redemption Camp in Nigeria are third-party
speculative real estate listings (private sellers capitalizing on proximity to
the camp), not an RCCG program — they are not referenced here at all. The one
real, official "estate" fact — RCCG North America's planned housing estate as
part of its camp development — is presented as informational text with a link
to the church's own official site, the same pattern already used for Giving:
no purchase flow, no CTA to buy anything, ever.

**Gaps in the source site's public copy** (confirmed by fetching every relevant
page): no ministries list, no events list, no giving-method detail, no
leadership bios.

**Ministry names and annual programs, sourced from internal WhatsApp ministry
groups** (Kingdom Men, JHB Young Adults, YAYA JHB — shared by the site owner, a
member of these groups, read on 2026-08-26): the real ministry names are
**Kingdom Men** (men's ministry) and **YAYA — Youths And Young Adults** (young
adults' ministry, with its own choir). Both run an annual signature week:
**Men's Week** in October and **YAYA Week** in April. These replace the
previously-invented placeholder seasonal events (which were pure guesses, not
sourced from anything) with real, if lightly detailed, facts.

**Only aggregate, organizational-level facts are used from these chats — never
personal data.** These are private group chats containing dozens of ordinary
members' phone numbers, home addresses (including a gate code), birthdays,
births, financial/dues details, and Zoom meeting credentials. None of that
appears anywhere in this project. Only the ministry names and the existence/
rough timing of the two annual weeks are used; no member names beyond those
already independently confirmed on the church's own public site, no phone
numbers, no addresses, no meeting links.

**Real assets that DO exist on the live site** (found via deeper DOM inspection,
not just text-fetch): an actual logo file (`JHB Vertical - Color.png`), a real
"Church leadership" photo, and 3 unique hero photos in their homepage carousel,
all Wix-hosted. **These are deliberately not reused** — see the disclosure note
above. Phase 1 uses a custom typographic wordmark and stock photography instead.

**Content integrity rules for this build:**
- Real *factual* content (name, tagline, vision/mission text, address, phone,
  email, service times, leadership names/titles) is used verbatim — it's
  public information and this is clearly labeled as an unofficial concept, not
  an impersonation of the real site.
- No reuse of the church's actual logo image or actual photography (confirmed
  to exist, per above) — custom wordmark + stock photography only.
- Where the source has nothing, Phase 1 uses clearly-structured, easily-editable
  *placeholder* content (ministries, seasonal events) rather than leaving pages
  empty — except where inventing content would be misleading to a real site
  visitor:
  - **Giving page uses real methods, sourced from a photo of the church's own physical giving-options signage (supplied by the user, 2026-08-26), transcribed as text — not fabricated:**
    - Give Online: link to the real `https://www.jesushousebhm.org/giving` (send donors to the church's own domain rather than collecting anything here)
    - Zelle: "The Redeemed Christian Church of God" — 205-586-9854
    - Text-to-Give: (833) 271-1840 — text GIVE plus an amount, e.g. "GIVE 25"
    - Cash/Check: ask for an envelope at service
    - A 4th app-based QR option was on the signage but its brand name was not legibly readable from the photo — **omit it rather than guess a payment provider's name**; note it as an open item for the user to confirm
    - **No QR codes are regenerated/fabricated for this build** — a mis-scanned or wrong QR is a real-money risk. Text/link only.
    - The Giving page carries its own explicit note (not just the footer disclaimer) that this reproduces the church's published giving information and that donors should confirm through `jesushousebhm.org` directly, since this site is not an official JHB channel.
  - **No fabricated personal testimonies.** A Testimonies page attributed to a real congregation must not contain invented quotes from invented (or unnamed but implied real) members. Deferred to Phase 2, when real submissions can be collected.
  - **No fake doctrinal statements.** "What We Believe" content stays broad/generic (standard evangelical Christian tenets), not JHB-specific doctrine we don't have.
- **No real form submission delivery.** Since this project isn't authorized by
  the church, no form may deliver to the church's real email/inbox.
- **Visible disclaimer required** (footer): this is an unofficial redesign
  concept/portfolio piece, not affiliated with or endorsed by Jesus House
  Birmingham, with a link to their real site.

## Tech stack

- Next.js (App Router), **JavaScript** (not TypeScript, per explicit direction —
  diverges from cac-salvation-center here)
- Tailwind CSS 4
- **GSAP + ScrollTrigger** — primary engine for heavy scroll-driven set-pieces
  (hero choreography, pinned sections, staggered/scrubbed timelines). Chosen
  over Framer-Motion-only because this site is meant to be more motion-intensive
  than cac-salvation-center, and GSAP is the more capable engine for that.
- **Framer Motion** — component-level transitions (nav/menu open-close, hover/tap
  states, modal-style UI, simple mount/unmount animation) where React-idiomatic
  state-driven animation is a better fit than an imperative GSAP timeline
- Lenis (smooth scroll) — GSAP's ScrollTrigger is synced to Lenis's scroll
  position so the two don't fight each other
- No email/backend service in Phase 1 (see "Forms" — UI-only, no real send)
- Deployed to Vercel; new GitHub repo `jesus-house-birmingham-concept` (named to
  make the unofficial/demo status clear rather than implying it's the church's
  actual repo)

## Visual identity

**Palette** (custom, RCCG-adjacent but distinct from any existing site):
- Sanctuary Red `#8A1538` — primary
- Radiant Gold `#C6A15B` — accent
- Ivory `#FBF7F0` — light background
- Ink `#211A1D` — text / dark background
- Blush `#F4E6E9` — soft section tint
- Plum `#3B1220` — footer / dark sections

**Typography:**
- Headings/reveals: **Fraunces** (variable serif, via `next/font/google`)
- Body/UI: **Manrope**

**Wordmark:** typographic "Jesus House" lockup. A real logo image exists on the
church's live site but is deliberately not reused here (see disclosure note) —
this isn't a "no asset available" placeholder, it's an intentional boundary.

**Motion primitives** (same conceptual toolkit as cac-salvation-center, own
tuning — not copy-pasted; split between GSAP and Framer Motion by what each
engine is better at):

GSAP + ScrollTrigger (scroll-driven set-pieces):
- Hero entrance choreography (staggered headline/verse/CTA sequencing)
- `PinSection` — pinned/scrubbed section transitions (e.g. service-times strip,
  ministries showcase)
- `RevealText` — scroll-triggered staggered text reveal (word/line/char split)
- `Parallax` — layered scroll parallax for imagery/sections
- `ScrollProgress` — top-of-page scroll progress indicator

Framer Motion (component/state-driven interaction):
- `Reveal` — simple fade/slide-into-view for cards/lists
- `Magnetic` — magnetic hover effect for buttons/nav items
- Nav/mobile-menu open-close, modal-style overlays, form field micro-interactions

A signature scripture-verse ticker component built around Luke 1:37 (JHB's own
featured verse) — conceptually similar to CAC's watchword/verse-of-day
component, but its own implementation and content; built with GSAP since it's a
scroll/timed set-piece.

## Sitemap & per-page content plan

| Route | Content | Source |
|---|---|---|
| `/` (Home) | Hero (tagline + verse reveal), service-times strip, welcome message, ministries preview, events preview, visit/giving CTAs | Real (tagline, verse, times) + links to placeholder sections |
| `/about` | RCCG affiliation, vision & mission statements, broad "what we believe", a "Part of a Global Family" section on RCCG worldwide (Nigeria HQ) and RCCG North America (Greenville, TX HQ) | Real (affiliation, vision, mission, RCCG HQ facts) + generic (beliefs) |
| `/leadership` | Real names/titles for pastors + ministry leads; monogram-avatar treatment (no photos available) | Real |
| `/visit` | Service times, address + embedded map, what-to-expect, plan-a-visit form | Real |
| `/ministries` | Ministry cards: **Kingdom Men** and **YAYA (Youths & Young Adults)** use real names/facts (sourced from internal ministry chats, 2026-08-26); Children's Church, Women's Fellowship, Media & Creative Arts, Ushering & Protocol, Prayer Band, Outreach & Missions, Choir/Worship Team remain illustrative placeholders | Mixed real + placeholder, per-item |
| `/events` | Real recurring services (Sunday/Wednesday) + 2 real annual programs (Men's Week/October, YAYA Week/April, sourced 2026-08-26) | Real |
| `/giving` | Mission-focused messaging + real giving methods (Give Online link, Zelle, Text-to-Give, Cash/Check), transcribed from physical signage, with an explicit "confirm via jesushousebhm.org" note | Real (photo-sourced, 2026-08-26) |
| `/gallery` | Curated stock worship/community photography | Placeholder imagery (real JHB photos exist but are deliberately not reused) |
| `/testimonies` | "Share your testimony" invite CTA only — no invented quotes | Deferred — would need an authorized engagement to collect real ones |
| `/contact` | Address/phone/email/map, UI-only contact form | Real (info) + UI-only form |
| `/prayer` | Prayer request form, UI-only success state, no real delivery | UI-only form |
| `/not-found`, `sitemap.xml`, `robots.txt` | Standard | — |

## Forms

Contact, Prayer Request, and Plan-a-Visit forms are **UI-only** in Phase 1: client-side
validation, a genuine submit interaction with loading/success states, but no real
network delivery — no email service, no database. This is a deliberate consequence
of the project's unauthorized/demo status (see disclosure note above), not a
placeholder to "fix later" in the same sense as content gaps. Real delivery would
only become appropriate if this ever became an authorized engagement with the
church, which is out of scope for this spec.

## Component architecture (mirrors cac-salvation-center's shape)

```
app/
  page.jsx                 (Home)
  about/page.jsx
  leadership/page.jsx
  visit/page.jsx
  ministries/page.jsx
  events/page.jsx
  giving/page.jsx
  gallery/page.jsx
  testimonies/page.jsx
  contact/page.jsx
  prayer/page.jsx
  layout.jsx, globals.css, not-found.jsx, sitemap.js, robots.js
components/
  navigation/Nav.jsx
  providers/SmoothScroll.jsx   (Lenis)
  sections/                    (Hero, ServiceTimes, MinistriesPreview,
                                 EventsPreview, WelcomeMessage, VerseTicker,
                                 ConceptDisclaimer, ...)
  ui/                           (Reveal, RevealText, Parallax, PinSection,
                                 Magnetic, ScrollProgress — GSAP-based ones
                                 register ScrollTrigger + sync to Lenis)
```

## Repo & deployment plan

- Scaffold in this directory (`C:\Users\WT8\Projects\JHB`)
- New GitHub repo `jesus-house-birmingham-concept` under the user's account —
  named to signal demo/concept status, not the church's actual repo
- New Vercel project (default `*.vercel.app` subdomain — no custom domain that
  could be mistaken for the church's real site)
- **Actual repo creation, push, and Vercel deploy require explicit user
  confirmation at that step** — this spec authorizes the design/build, not the
  publish.

## Future phases (context only — not designed yet)

These assume the project's status is unchanged (unauthorized demo). If it never
becomes an authorized engagement, "real" in the descriptions below means demo/
sample data generated for the build, not actual data collected from real site
visitors or the church itself.

2. **Backend foundation** — Supabase schema (events, gallery, prayer requests,
   newsletter subscribers, blog posts, products/orders); wire public
   pages/forms to persisted demo data.
3. **Admin console** — authenticated admin app: dashboard, CRUD for
   events/announcements/gallery/blog, prayer request inbox, newsletter broadcast.
4. **Store + giving** — Stripe-backed store in test mode; no real online giving
   processing without an authorized engagement (a demo site must not collect
   real payments on the church's behalf).
5. **Polish + integrations** — analytics, SEO/sitemap refinement. Instagram feed
   integration and a custom domain are dropped unless this becomes authorized —
   both would misleadingly suggest official status.

## Open items

- **Confirm the 4th giving app's name** (a QR-code option on the physical
  giving signage whose brand name wasn't legible in the supplied photo) —
  not included in Phase 1 pending confirmation

Everything below is only relevant if this becomes an authorized engagement —
listed so a future, authorized phase knows what to ask the church for:

- Real ministries list (names, leaders, meeting times)
- Real events calendar
- Chosen giving platform/method
- Leadership headshots
- Permission to use their actual logo/photography (confirmed to exist)
- Real member testimonies
