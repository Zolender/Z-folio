# zolender.xyz — Build Plan

> Last updated: July 3, 2026

---

## Group A — Data layer

Everything the UI reads from. No hardcoded content anywhere in components.

- [x] `src/types/index.ts` — `Project` interface, single source of truth for what a project is
- [x] `src/data/projects.ts` — all four projects (CineSearch, Z-Tales, AgriHub, Z-Book) with enhanced descriptions pulled from the actual repos
- [x] `src/data/content.ts` — Hero bio, About paragraphs, Contact opening line and links
- [x] `src/data/skills.ts` — skill groups with `highlighted` flag for Frontend and Backend
- [x] All section components read from data files

---

## Group B — Design pass

Visual design applied to every component. No animations yet.

- [x] Inter font loaded in `index.html` via Google Fonts (weights 400 and 600)
- [x] `@theme` tokens in `global.css` — Tailwind generates all color utilities from them
- [x] `@layer base` — fixes CSS layer conflict that was blocking all Tailwind utilities
- [x] `@utility scrollbar-hide` — custom Tailwind utility for scroll containers
- [x] `BrandIcons.tsx` — inline SVG components for GitHub and LinkedIn (Lucide removed brand icons)
- [x] Favicon — `.ico` in `public/`, referenced in `index.html` alongside the SVG
- [x] **Navbar** — full-width bar at top, transitions to floating pill on scroll, brand name drops when scrolled
- [x] **Hero** — eyebrow label, `text-6xl` name with `tracking-tight`, inner `max-w-3xl` container, ArrowRight CTA
- [x] **About** — lead paragraph larger, closing line heavier and brighter, consistent section label
- [x] **Projects** — horizontal scroll row, `scrollbar-hide`, right-fade gradient, ProjectCard with `group-hover` arrow
- [x] **Skills** — `highlighted` groups use accent-border tags, category labels styled as sublabels
- [x] **Contact** — icon + label social links using `getLinkIcon`, two-column layout
- [x] **Footer** — icon + label social links, consistent `px-8` horizontal rhythm
- [x] **ProjectPage** — description split into paragraphs, "What I learned" with accent left border, icon buttons

### Color palette
Switched from warm (stone wheat) to futuristic (electric indigo). One-file change via `@theme`. Since June 29 the accent is **live-themable** (5 presets via the command palette) and a full **light-mode token set** exists alongside it — see Group F.

| Token | Value | Role |
|---|---|---|
| canvas | `#0d0e14` | Page background |
| surface | `#13141e` | Card / section background |
| raise | `#1a1b28` | Hover and lifted states |
| accent | `#7c6af7` | Primary accent (electric indigo) |
| accent-dim | `#5b4de8` | Accent on hover |
| ink | `#e2e4f0` | Primary text |
| muted | `#737994` | Secondary text |
| edge | `#252639` | Borders |

---

## Group C — Animations ✅ (June 1–6)

Framer Motion. Every animation must have a job — if removing it wouldn't make the experience worse, it doesn't ship. Everything respects `prefers-reduced-motion` via the `useMotion` hook.

- [x] **Hero depth-pull** — `useScroll` + `useTransform`: text translates up and fades as user scrolls away from hero
- [x] **Section reveals** — staggered fade-in + directional translate as each section enters the viewport, wired into `SectionWrapper` (bi-directional: hidden → visible → past)
- [x] **Projects horizontal scroll** — scrollable card row with edge fades and infinite loop
- [x] **ProjectCard lift** — hover lift with spring physics (later upgraded to 3D tilt + glare, see Group F)
- [x] **Navbar brand name** — AnimatePresence fade instead of instant disappear
- [x] **Magnetic cursor** — `useMagnetic` hook on Hero CTAs, desktop (`pointer: fine`) only
- [x] **Canvas background** — dot grid + ripple rings + ambient glow orb, touch-aware, reduced-motion fallback is a static CSS dot grid
- [x] **Custom cursor** — dot + ring on interactive elements, desktop only

---

## Group D — Contact form integration ✅ (June 4)

- [x] Serverless function on Vercel (`api/contact.ts`) receives the form POST
- [x] Connected to Resend API — delivers to `ndeingare@gmail.com`, `replyTo` set to the sender
- [x] `RESEND_API_KEY` in Vercel environment variables (server-side only — no `VITE_` prefix; `VITE_` vars are bundled into client code and must never hold secrets)
- [x] Tested end to end — form delivers ("contact form is functional", June 4)
- [x] Hardened July 3 — see Group G

---

## Group E — Deployment ✅

- [x] Repo connected to Vercel
- [x] Environment variables in Vercel dashboard
- [x] `zolender.xyz` DNS (Namecheap) pointed at Vercel
- [x] Live — apex `zolender.xyz` currently 308-redirects to `www.zolender.xyz` (see Group H: domain canonicalization)

---

## Group F — Interaction & theming layer ✅ (June 29–30)

- [x] **⌘K command palette** — navigation, project jumps, copy email, accent + mode switching; OS-correct key-caps; first-visit hint toast
- [x] **Live accent theming** — 5 presets persisted to localStorage, canvas background reads the live accent
- [x] **Light / dark / system mode** — `data-mode` on `<html>`, circular-wipe View Transition on switch
- [x] **Scroll-spy navbar** — IntersectionObserver + sliding pill, desktop side dot-rail
- [x] **Native View Transitions for routes** — clicked project card title morphs into the page heading (replaced Framer page transitions)
- [x] **Signature motion** — masked text reveals, Hero SVG arc draw-ins, project-card 3D tilt + glare, cursor "View" label
- [x] **SEO metadata** — Open Graph, Twitter cards, canonical, JSON-LD Person in `index.html`

---

## Group G — Production hardening ✅ (July 3)

Audit pass: verified a list of production gaps against the code, fixed all of it. One themed commit per fix, each verified with `npm run build`. Concepts written up in `Notes.md` Session 6.

- [x] **404 catch-all** — `<Route path="*">` → `NotFound` page
- [x] **Error boundary** — top-level class component; render crash shows a fallback instead of a white screen
- [x] **Per-page titles** — `useDocumentTitle` hook on Home / ProjectPage / NotFound
- [x] **Contact form a11y** — `sr-only` labels on all fields, `role="status"` + `aria-live="polite"` on sent/error messages
- [x] **API lock-down** — CORS `*` → `https://zolender.xyz` (override with `ALLOWED_ORIGIN` env; the site's own form is same-origin and unaffected), hidden honeypot field checked server-side, per-IP rate limit (5/min, best-effort per warm instance)
- [x] **robots.txt + sitemap.xml** — home + all four project URLs
- [x] **Image optimization** — screenshots PNG → WebP resized to 480px tall: **5.1MB → 292KB**; `me.jpg` 2160×2177/370KB → 992×1000/**89KB** (kept JPEG for OG-scraper compatibility)
- [x] **Lazy loading + layout shift** — `loading="lazy"` + `decoding="async"` + intrinsic `width`/`height` on screenshots (data model now `{ src, width, height }`); Hero photo eager with dimensions
- [x] **Render perf** — `matchMedia` hoisted to module level in Hero; canvas backing store scaled by `devicePixelRatio` (capped at 2) so it's crisp on phones
- [x] **Vercel Analytics** — `@vercel/analytics` mounted in `App`
- [x] **Cosmetic** — package name `portefolio` → `portfolio`; stale CineSearch URL in `Content.md` → `z-moviies.vercel.app`

---

## Group H — Launch checklist (open)

Everything left is either content capture or work outside this repo.

- [ ] **Z-Tales screenshots** — flagship project, only one with none; folder ready at `public/screenshots/z-tales/`, convert to WebP + add dimensions to `projects.ts` once captured
- [ ] **Z-Book screenshots** — same, lower priority
- [ ] **GitHub repo settings** — Z-folio homepage still points at `portefolio-two-tawny.vercel.app` and the description says "portefolio"; MovieApp homepage points at the dead `movie-app-two-pi-45.vercel.app` (live is `z-moviies.vercel.app`)
- [ ] **LinkedIn** — add zolender.xyz to the website field (unverified)
- [ ] **Google Search Console** — verify the domain, submit `sitemap.xml`
- [ ] **Domain canonicalization** — apex redirects to www, but canonical/OG/sitemap all say `https://zolender.xyz`; pick one primary in Vercel domain settings and align the metadata (if www wins, update `index.html`, `sitemap.xml`, `robots.txt`, and the `ALLOWED_ORIGIN` default)
- [ ] **Dedicated OG card** — a real 1200×630 social image instead of the square `me.jpg`
- [ ] **Later / optional** — prerendering or SSG so crawlers see real content without JS; the sitemap covers most of it for now

---
