> Everything decided and locked before a single folder is created. Built session: May 30, 2026.

---

## 1. Hero Section

**Name:** Eben-Ezer Ndeingar **Title:** Full-Stack Developer in the Making, Kigali, Rwanda

**Bio:**

> I care about writing code that is organized, scalable, and maintainable. I'm a CS student with about a year left before graduating, building real applications while I study, because waiting to finish uni before starting felt like the wrong order.

---

## 2. About Section

> Growing up, I always admired people who could create things. Planning is easy, actually pulling it off is something else.
> 
> I loved football for that reason. You could imagine a perfect play in your head, but executing it on the pitch, when it actually worked, that feeling was different. When I got introduced to computers and phones, later than most, I found that same feeling in software. The idea that someone's mind could think ahead, anticipate what a user would do, handle edge cases before they happen, and turn all of it into something people hold in their hands every day, that genuinely amazed me.
> 
> I picked up Computer Science at university and knew early it was right. Not just as a career, but as a craft. I spent a long time in the tutorial phase, building things that mostly existed to teach me things, and that period was necessary. It's where I learned how much I didn't know, and why that mattered.
> 
> Eventually something shifted. I stopped building to learn and started learning while building.
> 
> That shift got sharper through The Gym Rwanda, a structured software engineering program that taught me to care even more about the craft, and pushed me past limits I didn't know I had. The resilience, the depth, the habit of not stopping when something gets hard, that came from there, and from a few other experiences that taught me the same thing: working hard might genuinely be the secret.
> 
> No more waiting to be ready, just getting right to it.

---

## 3. Projects

### CineSearch

**One-liner:** A movie and series discovery app where users can search titles, explore details, save favorites, and pick up right where they left off, without losing their searches between sessions.

**Description:**

> The interesting part isn't the search, it's the state. When a user leaves the search page and comes back, Redux keeps their results alive, no refetch, no blank slate. Framer Motion handles the transitions so the whole thing feels smooth rather than snappy.

**Stack:** React, TypeScript, Redux Toolkit, React Router, Tailwind CSS, Framer Motion, OMDb API

**What I learned:**

> How to think about state that outlives a component, and that good UX is often invisible, the user just feels like the app is on their side.

**Links:**

- Live: https://z-moviies.vercel.app
- GitHub: https://github.com/Zolender/MovieApp

---

### Z-Tales

**One-liner:** A full-stack blog platform built for writers who want a clean, honest space to publish, and readers who want something worth reading.

**Description:**

> The first project I built with a proper frontend/backend separation, two separate folders, two separate deployments, one coherent system. JWT authentication with session rehydration on page load, role-based access enforced at the API level not just the UI, Zod for schema validation, Helmet and rate limiting for security. The architecture diagram and database schema are documented in the repo.
> 
> Users can write with markdown, like and comment on posts, and admins can manage the whole platform from a dedicated panel.

**Stack:** React 19, TypeScript, Redux Toolkit, React Router v7, Node.js, Express, PostgreSQL (Supabase), JWT, Bcrypt, Zod, Tailwind CSS, Framer Motion

**What I learned:**

> That security isn't a feature you add at the end, and that separating concerns early makes everything that comes later easier to reason about.

**Links:**

- Live: https://z-tales.vercel.app
- GitHub: https://github.com/Zolender/Blog

---

### AgriHub

**One-liner:** An inventory management system for agricultural distributors across Rwanda.

**Description:**

> Managers track stock in real time, analysts read dashboards and filter by region, product, or date, and admins control who sees what. Built to handle the actual complexity of supply chain work.
> 
> I'm the only full-stack developer on the team, working alongside AI engineers with a roadmap that includes AI-powered features down the line. The system supports CSV bulk import with granular error reporting, low stock alerts, multi-region tracking, and role-based access across three permission tiers.

**Stack:** TypeScript, React, Node.js, PostgreSQL

**What I learned:**

> How to build for a team and a real use case at the same time, and that being the only full-stack dev teaches you resilience, patience, and a certain attention to detail you don't develop any other way.

**Links:**

- Live: https://agrihub-z.vercel.app
- GitHub: https://github.com/Zolender/Agri-hub

---

## 4. Skills

|Category|Tools|
|---|---|
|**Frontend**|React, TypeScript, Redux Toolkit, React Router, Tailwind CSS, Framer Motion|
|**Backend**|Node.js, Express, PostgreSQL, Supabase, JWT, Bcrypt, Zod|
|**Tooling**|Vite, Git, GitHub, Postman, Prisma|
|**Deployment**|Vercel, Render, Supabase, Namecheap (DNS)|
|**Currently deepening**|MongoDB, WebSockets, Socket.io|

---

## 5. Contact Section

**Opening line:**

> I'm open to opportunities, collaborations, or just a conversation about something you're building. The best way to reach me is by email, but all the links below work.

**Form fields:** Name, Email, Message, Send button **Email delivery:** Resend API (account already active)

**Links:**

- Email: ndeingare@gmail.com
- LinkedIn: https://linkedin.com/in/eben-ezer-ndeingar
- GitHub: https://github.com/Zolender

---

## 6. Meta

- **Domain:** zolender.xyz (Namecheap, purchased May 2026)
- **Target companies:** Awesomity Lab, SevenX (Kigali)
- **Tone:** Thoughtful and intentional, honest, not trying to impress, just trying to be clear
- **Stack for the portfolio site itself:** Vite + React + TypeScript, React Router, Tailwind CSS, Framer Motion

---

_Next session: design decisions, color palette, layout, then build._

---

## 7. Color Palette (Locked)

> Warm dark, not cold. Brown-toned blacks, cream text, stone wheat accent. Nothing that shouts.

|Token|Hex|Role|
|---|---|---|
|Deep Warm Black|`#181715`|Page background|
|Warm Charcoal|`#22201C`|Card / section background|
|Lifted Surface|`#2C2923`|Hover and active states|
|Stone Wheat|`#B8936A`|Primary accent|
|Accent Hover|`#8A6A48`|Accent on hover|
|Warm Cream|`#E2D5C3`|Primary text|
|Muted Sand|`#9A8E80`|Secondary text|
|Border Warm|`#383430`|Card borders|

**Accent usage:**

- Amber-outlined tags for core stack (React, Node.js, TypeScript)
- Neutral-outlined tags for supporting tools (PostgreSQL, Framer Motion)
- Accent color on hover borders for project cards
- CTA button background uses Stone Wheat with Deep Warm Black text

**Typography:** Inter font, two weights only — 400 regular and 600 bold. Units in rem and vw/vh throughout. px only for border widths.

---

## 8. Layout and Scroll Architecture (Locked)

### Main page sections and scroll behavior

|Section|Scroll behavior|
|---|---|
|Hero|Text fades and moves up as user scrolls away — depth pull|
|About|Lines reveal as user scrolls into view|
|Projects|Horizontal scroll row, cards slide left to right, staggered reveal on entry|
|Skills|Tags pop in with stagger, no heavy animation|
|Contact|Simple fade in, form + social links|

### Project card interactions (3 layers, each with a distinct job)

- **Scroll:** card reveals with stagger + depth pull into view
- **Hover:** card lifts slightly, accent border glows
- **Click:** navigates to `/projects/:slug`

### Individual project pages

- Route: `/projects/:slug` handled by React Router v7
- One reusable `ProjectPage` component, reads slug from URL, finds project in `projects.ts`
- Adding a new project = adding one typed object to `projects.ts`, nothing else changes

**Project page structure:**

1. Hero — project name and one-liner
2. Full description — fully descriptive, explains the problem, how the system works, and why decisions were made. Not a summary, not bullet points.
3. Screenshots — 2 to 3 images or a demo
4. Stack tags — same accent tag style as main page
5. What I learned — one honest paragraph
6. Links — live site and GitHub

### Routing map

```
/                     → main portfolio page
/projects/cinesearch  → CineSearch detail page
/projects/z-tales     → Z-Tales detail page
/projects/agrihub     → AgriHub detail page
```

### Data layer

- `projects.ts` — single source of truth for all project data
- Typed objects with: name, slug, one-liner, full description, stack, links, what I learned, screenshots
- Both the project card on the main page and the detail page read from this file

---

## 9. Interaction and Animation Decisions (Locked)

### Cursor

- **Primary:** Magnetic effect — interactive elements (buttons, project cards) gently pull toward the cursor on approach, roughly 5 to 8px of movement
- **Fallback:** Trailing ring cursor if magnetic feels off in the browser — decide after seeing it live
- Build magnetic first, feel it, then decide

### Scroll animations

- Depth scroll using Framer Motion `useScroll` and `useTransform`
- Mental model: as page scrolls from 0 to 1, transform values from A to B
- The "going deeper" feeling — sections pull you in rather than appearing flat
- Horizontal scroll section for projects

### Parallax background

- Deferred decision — build core scroll first
- Add a slow-moving subtle background layer only if the page needs more depth after the scroll animations are in place
- Rule: add only if it adds, not to fill space

### Animation principle

- Every animation has a job. If removing it would make the experience worse, keep it. If not, cut it.

---

## 10. Folder Structure

### Top level — after `npm create vite@latest zolender-portfolio --template react-ts`

```
zolender-portfolio/
├── public/
├── src/
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### src/ — organised by type

```
src/
├── assets/        screenshots, images, static files
├── components/    reusable UI building blocks
├── data/          projects.ts — single source of truth
├── hooks/         custom hooks, cursor logic, scroll hooks
├── pages/         one file per route
├── styles/        global CSS, Tailwind base, CSS variables
└── types/         TypeScript interfaces and types
└── routes/         holds the routing files

```

**Key distinction:** `pages/` is what React Router renders at a route. `components/` is what pages are assembled from. They have different jobs and stay separate.

### Full structure

```
zolender-portfolio/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── screenshots/          one folder per project
│   │       ├── cinesearch/
│   │       ├── z-tales/
│   │       └── agrihub/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx         wraps every page, holds Navbar and Footer
│   │   │   ├── Navbar.tsx         floating pill, responsive — bottom on mobile, top on tablet and desktop
│   │   │   └── Footer.tsx         minimal, just links
│   │   ├── cursor/
│   │   │   └── MagneticWrapper.tsx  wrap any element to give it magnetic pull on hover
│   │   ├── sections/              one component per home page section
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx       horizontal scroll container on desktop, stacked oblique reveal on mobile
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   ├── project/
│   │   │   ├── ProjectCard.tsx    card shown in the projects row
│   │   │   └── Lightbox.tsx       full screen image overlay, opens on screenshot click
│   │   └── shared/
│   │       ├── SectionWrapper.tsx  scroll reveal animation — wrap any section, depth reveal for free
│   │       └── StackTag.tsx        accent-outlined tag, used in cards and detail pages
│   ├── data/
│   │   └── projects.ts            single source of truth for all project data
│   ├── hooks/
│   │   ├── useMagnetic.ts         magnetic cursor logic
│   │   └── useScrollAnimation.ts  scroll-driven animation values via Framer Motion
│   ├── pages/
│   │   ├── Home.tsx               renders all sections in order
│   │   └── ProjectPage.tsx        reads slug from URL, finds project in projects.ts, renders detail view
│   ├── styles/
│   │   └── global.css             Tailwind base, CSS variables, color tokens
│   ├── types/
│   │   └── index.ts               Project interface and any shared types
│   ├── App.tsx                    React Router setup, route definitions
│   └── main.tsx                   Vite entry point
├── .env                           RESEND_API_KEY and any other secrets
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Navbar responsive behavior

- **Mobile** — bottom floating pill, icons only, glassy backdrop blur
- **Tablet** — top floating pill, icons with short labels
- **Desktop** — top floating pill, full labels, name on the left

### Projects section responsive behavior

- **Desktop** — horizontal scroll driven by page scroll, depth pull left to right
- **Mobile** — cards stack vertically with oblique reveal, top left to bottom right, `x: -20, y: 30, rotate: 2 → 0`

### Screenshot section on project detail page

- Horizontal scrollable thumbnail strip
- Click or tap any thumbnail opens `Lightbox.tsx`
- Lightbox fades and scales in with Framer Motion, close on click outside or Escape key
- Chevron buttons inside lightbox to navigate previous and next screenshots without closing
- Same component works on mobile and desktop, no layout difference needed

### Contact section responsive behavior

- **Desktop** — two columns, form on the left, social links on the right
- **Mobile** — stacked, form on top, links below

### Cursor

- Magnetic effect on desktop only, removed on touch screens
- On mobile and tablet, card lift animation on tap replaces it

---

## 11. Pre-build Checklist

- [x] Hero copy locked
- [x] About section locked
- [x] CineSearch project write-up locked
- [x] Z-Tales project write-up locked
- [x] AgriHub project write-up locked
- [x] Skills section locked
- [x] Contact section locked
- [x] Color palette locked
- [x] Layout and scroll architecture locked
- [x] Interaction decisions locked
- [x] Top level folder structure locked
- [x] src/ structure locked
- [x] components/ structure locked
- [x] Full structure diagram locked
- [x] Domain purchased — zolender.xyz
- [x] README written and locked
- [ ] Screenshots ready for each project
- [ ] Resend API key confirmed and ready
- [ ] Open terminal and run `npm create vite@latest`