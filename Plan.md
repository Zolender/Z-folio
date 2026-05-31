# zolender.xyz — Build Plan

> Last updated: May 31, 2026

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
Switched from warm (stone wheat) to futuristic (electric indigo). One-file change via `@theme`.

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

## Group C — Animations

Framer Motion. Every animation must have a job — if removing it wouldn't make the experience worse, it doesn't ship.

- [ ] **Hero depth-pull** — `useScroll` + `useTransform`: text translates up and fades as user scrolls away from hero
- [ ] **Section reveals** — staggered fade-in + slight upward translate as each section enters the viewport. Wire into `SectionWrapper` so every section gets it for free
- [ ] **Projects horizontal scroll** — scroll-driven horizontal transform on the cards row (page scroll moves cards left)
- [ ] **ProjectCard lift** — subtle `y` translate and shadow increase on hover
- [ ] **Navbar brand name** — fade out on scroll rather than instant disappear (currently conditional render, no transition)
- [ ] **Magnetic cursor** — `MagneticWrapper.tsx` shell is already in place, needs `useMagnetic.ts` logic. Applies to buttons and project cards on desktop only, disabled on touch screens

---

## Group D — Contact form integration (pending)

- [ ] Serverless function on Vercel (`/api/contact`) to receive form POST
- [ ] Connect to Resend API — send to `ndeingare@gmail.com`
- [ ] Add `VITE_RESEND_API_KEY` to Vercel environment variables
- [ ] Test end to end before deploying

---

## Group E — Deployment (pending)

- [ ] Push to GitHub (`github.com/Zolender/zolender-portfolio`)
- [ ] Connect repo to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Point `zolender.xyz` DNS (Namecheap) to Vercel — add CNAME record
- [ ] Verify live at `https://zolender.xyz`

---

## Remaining before Group C

- [ ] Screenshots for CineSearch, AgriHub, Z-Book — save as `public/screenshots/[slug]/1.png`, `2.png`
- [ ] Screenshots for Z-Tales — deferred, more work needed on the app first
- [ ] Update `projects.ts` screenshot arrays once files are in place

---

## Notes
- No em dashes anywhere in the project. Commas, semicolons, or colons.
- Never raw pixel values — use `rem` for layout/type, `vw`/`vh` for viewport-relative sizing.
- Never inline `style` props when a Tailwind class can do it.
- Inner content containers: `max-w-3xl mx-auto w-full` inside `SectionWrapper`.
- React Router v7: import from `"react-router"`, not `"react-router-dom"`.
- Navbar anchor links use `/#about` not `#about` — works from both home and project pages.
