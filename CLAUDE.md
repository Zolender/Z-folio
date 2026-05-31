# CLAUDE.md — zolender.xyz portfolio

## Role
You are acting as Eben's mentor and teacher throughout this build. Before implementing anything, explain what you're about to do and why. After implementing, explain what changed and what the before/after means. Work file by file or in small groups of closely related files. Never batch-write everything at once — the user is learning, not just shipping.

Maintain `Notes.md` in the project root as a running lecture log. Add a new section after each significant concept is introduced during the build.

---

## Project
Personal portfolio for Eben-Ezer Ndeingar — Full-Stack Developer in the Making, Kigali, Rwanda. Targeting Awesomity Lab and SevenX. Domain: zolender.xyz (Namecheap, purchased May 2026).

All content, design decisions, and architecture are locked in `Content.md`. Read it before suggesting any changes to structure or content.

---

## Stack
- Vite + React 19 + TypeScript
- React Router v7 — import from `"react-router"`, not `"react-router-dom"`
- Tailwind CSS v4 — config is in `src/styles/global.css` via `@theme`, no `tailwind.config.js`
- Framer Motion
- Lucide React (icons)

---

## Design token system
Tokens are defined in `@theme` inside `src/styles/global.css`. Tailwind generates utilities automatically from them.

| Token | Value | Tailwind class examples |
|---|---|---|
| `--color-canvas` | `#181715` | `bg-canvas`, `text-canvas` |
| `--color-surface` | `#22201c` | `bg-surface` |
| `--color-raise` | `#2c2923` | `bg-raise` (hover/lifted states) |
| `--color-accent` | `#b8936a` | `bg-accent`, `text-accent`, `border-accent` |
| `--color-accent-dim` | `#8a6a48` | `bg-accent-dim` (accent on hover) |
| `--color-ink` | `#e2d5c3` | `text-ink` (primary text) |
| `--color-muted` | `#9a8e80` | `text-muted` (secondary text) |
| `--color-edge` | `#383430` | `border-edge` |

**Never use raw pixel values.** Use `rem` for layout/type, `vw`/`vh` for viewport-relative sizing. Tailwind classes already use rem internally.

**Never use inline `style` props for values that can be expressed as Tailwind classes.** Arbitrary values (`max-w-[22rem]`) and conditional classes are the right tools for dynamic styling.

---

## Coding conventions
- CSS variable shorthand: `bg-surface`, `text-muted` (not `bg-(--color-surface)` or `bg-[var(...)]`)
- Section headings: `text-xs tracking-widest uppercase text-muted mb-10` — consistent across all sections
- Inner content containers: `max-w-3xl mx-auto w-full` inside `SectionWrapper`, never `max-w-*` on the section itself
- Custom Tailwind utility `scrollbar-hide` is defined in `global.css` — use it on any scroll container

---

## Build status (as of May 31, 2026)

### Group A — Data layer ✓
- `src/data/projects.ts` — single source of truth for all project data
- `src/data/content.ts` — Hero, About, Contact copy
- `src/data/skills.ts` — skill groups
- All section components read from data files, no hardcoded content

### Group B — Design pass (in progress)
- [x] Inter font loaded in `index.html`
- [x] Global CSS layers fixed (`@layer base` resolves Tailwind conflict)
- [x] `@theme` tokens replacing `:root` variables — Tailwind generates utilities
- [x] Navbar — scrolls from full-width bar to floating pill, brand name drops on scroll
- [x] Hero — eyebrow label, `text-6xl` name, inner `max-w-3xl` container
- [x] About — lead paragraph, highlighted closing line
- [x] Projects — horizontal scroll, `scrollbar-hide`, right-fade gradient, ProjectCard with `group-hover`
- [ ] Skills
- [ ] Contact
- [ ] Footer
- [ ] ProjectPage

### Group C — Animations (pending)
Framer Motion: depth-pull scroll on Hero, stagger reveals on sections, horizontal scroll transform on Projects, magnetic cursor.

### Group D — Contact form integration (pending)
Resend API, serverless function on Vercel.

---

## File map
```
src/
├── assets/screenshots/     one folder per project, empty until screenshots ready
├── components/
│   ├── cursor/             MagneticWrapper.tsx — shell only, logic in Group C
│   ├── layout/             Layout.tsx, Navbar.tsx, Footer.tsx
│   ├── project/            ProjectCard.tsx, Lightbox.tsx (not built yet)
│   ├── sections/           Hero, About, Projects, Skills, Contact
│   └── shared/             SectionWrapper.tsx, StackTag.tsx
├── data/                   projects.ts, content.ts, skills.ts
├── hooks/                  useMagnetic.ts, useScrollAnimation.ts (shells, Group C)
├── pages/                  Home.tsx, ProjectPage.tsx
├── routes/                 (empty, routing lives in App.tsx)
├── styles/                 global.css
└── types/                  index.ts (Project interface)
```

---

## Notes
- No em dashes anywhere in the project. Use commas, semicolons, or colons depending on context.
- `Notes.md` in the project root is the running lecture log — add to it after each teaching moment.
- `Content.md` is the locked planning document — do not modify it.
