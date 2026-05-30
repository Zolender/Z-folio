# zolender.xyz

My personal portfolio, built the way I try to build everything else, intentionally. Not just something that works, but something I actually thought through before writing a single line.

**Status:** In development. Domain purchased at zolender.xyz, deployment pending.

---

## What this is

A full-stack developer portfolio featuring the projects I have built while finishing my CS degree in Kigali. It has a depth-driven scroll experience, a magnetic cursor effect, individual project pages, and a contact form that actually delivers to my inbox. Built to represent where I am and where I am going.

---

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, React Router v7, Tailwind CSS v4, Framer Motion |
| Contact form | Resend API |
| Deployment | Vercel |
| Domain | Namecheap — zolender.xyz |

---

## Folder structure

```
src/
├── assets/          screenshots and static files
├── components/      reusable UI, layout, cursor, sections, project cards
├── data/            projects.ts — single source of truth for all project data
├── hooks/           useMagnetic, useScrollAnimation
├── pages/           Home.tsx and ProjectPage.tsx
├── styles/          global CSS and color tokens
└── types/           TypeScript interfaces
```

Adding a new project means adding one typed object to `projects.ts`. Nothing else changes.

---

## Running locally

```bash
git clone https://github.com/Zolender/zolender-portfolio
cd zolender-portfolio
npm install
cp .env.example .env   # add your Resend API key
npm run dev
```

---

## Environment variables

```
VITE_RESEND_API_KEY=your_resend_api_key_here
```

Used to deliver contact form submissions to the inbox. Nothing else is stored or sent anywhere.

---

## Author

**Eben-Ezer Ndeingar** — Full-Stack Developer in the Making, Kigali, Rwanda

- GitHub: [github.com/Zolender](https://github.com/Zolender)
- LinkedIn: [linkedin.com/in/eben-ezer-ndeingar](https://linkedin.com/in/eben-ezer-ndeingar)
- Email: ndeingare@gmail.com

---

_Built with intention. No more waiting to be ready, just getting right to it._
