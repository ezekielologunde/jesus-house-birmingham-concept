# Jesus House Birmingham — Unofficial Redesign Concept

This is an **unofficial, unauthorized portfolio/demo project** — a motion-interactive
redesign concept for [Jesus House Birmingham](https://www.jesushousebhm.org/), a real
RCCG (Redeemed Christian Church of God) parish in Birmingham, Alabama.

**This project is not affiliated with, endorsed by, or built in partnership with
the church.** It exists to demonstrate frontend/UI engineering work using a real,
public church's factual information (service times, address, ministries) as a
realistic content base — not to represent itself as the church's actual website.

For the church's real, official site, visit
[jesushousebhm.org](https://www.jesushousebhm.org/).

## What this is

- Real, publicly verifiable facts (service times, address, phone, real ministry
  names) reproduced accurately where sourced.
- An **original** logo mark, **not** RCCG's/JHB's real logo.
- **Open-license stock photography** on the Gallery page — not real photos of the
  church or its congregation.
- Every form (contact, newsletter, prayer requests, giving, store checkout) is a
  **simulated submission** — nothing is delivered anywhere, no real backend exists.
- A demo admin console (`/admin`) and demo store (`/store`) are UI-only concepts
  with in-memory mock data — not connected to any real backend or payment
  processor.
- The whole site is set to `noindex, nofollow` (see `app/robots.js`) and is not
  meant to be discovered via search engines.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + React
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
  for animation
- [Vitest](https://vitest.dev/) + React Testing Library for tests

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test         # run the test suite
npm run lint     # run eslint
npm run build    # production build
```
