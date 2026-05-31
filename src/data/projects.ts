import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "CineSearch",
    slug: "cinesearch",
    oneLiner:
      "A movie and series discovery app where users can search titles, explore details, save favorites, and pick up right where they left off, without losing their searches between sessions.",
    description:
      "The interesting part isn't the search, it's the state. When a user leaves the search page and comes back, Redux keeps their results alive: no refetch, no blank slate. The search history persists too, so returning to the app feels like it was waiting for you.\n\nEach result expands into full detail: poster, rating, runtime, cast, and plot summary. Framer Motion handles the transitions so the whole thing feels smooth rather than snappy.",
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Framer Motion",
      "OMDb API",
    ],
    coreStack: ["React", "TypeScript", "Redux Toolkit"],
    whatILearned:
      "How to think about state that outlives a component, and that good UX is often invisible; the user just feels like the app is on their side.",
    links: {
      live: "https://movie-app-two-pi-45.vercel.app",
      github: "https://github.com/Zolender/MovieApp",
    },
    screenshots: [],
  },
  {
    name: "Z-Tales",
    slug: "z-tales",
    oneLiner:
      "A full-stack blog platform built for writers who want a clean, honest space to publish, and readers who want something worth reading.",
    description:
      "The first project I built with a proper frontend/backend separation: two separate folders, two separate deployments, one coherent system. The frontend lives on Vercel, the Express API on Render, the database on Supabase; all three communicate over HTTPS. JWT authentication with session rehydration on page load, role-based access enforced at the API level not just the UI, Zod for schema validation, Helmet and rate limiting for security. The architecture diagram and database schema are documented in the repo.\n\nUsers can write with markdown, like posts, and leave threaded comments with one-level replies. Admins can assign roles, moderate content, and manage the whole platform from a dedicated panel.",
    stack: [
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "React Router v7",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "JWT",
      "Bcrypt",
      "Zod",
      "Tailwind CSS",
      "Framer Motion",
    ],
    coreStack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    whatILearned:
      "That security isn't a feature you add at the end, and that separating concerns early makes everything that comes later easier to reason about.",
    links: {
      live: "https://z-tales.vercel.app",
      github: "https://github.com/Zolender/Blog",
    },
    screenshots: [],
  },
  {
    name: "AgriHub",
    slug: "agrihub",
    oneLiner:
      "An inventory management system for agricultural distributors across Rwanda, built to handle the real complexity of supply chain work.",
    description:
      "Managers track stock in real time, analysts read dashboards and filter by region, product, or date, and admins control who sees what. The CSV import enforces a strict data contract with business rule validation: fulfilled quantities cannot exceed ordered quantities, and remaining stock cannot go below zero. When demand exceeds supply, the system logs the lost sale rather than silently ignoring it.\n\nI'm the only full-stack developer on the team, working alongside AI engineers. The roadmap includes AI-powered features, which is part of why the data layer was built to be clean and predictable from the start. Role-based access runs across three permission tiers, and Sentry handles error monitoring in production.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Tailwind CSS",
      "Sentry",
      "Vitest",
      "Playwright",
    ],
    coreStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    whatILearned:
      "How to build for a team and a real use case at the same time, and that being the only full-stack dev teaches you resilience, patience, and a certain attention to detail you don't develop any other way.",
    links: {
      live: "https://agrihub-z.vercel.app",
      github: "https://github.com/Zolender/Agri-hub",
    },
    screenshots: [],
  },
  {
    name: "Z-Book",
    slug: "z-book",
    oneLiner:
      "A note-taking app that saves to your browser, searches your notes instantly, and never permanently deletes anything until you decide it's gone for good.",
    description:
      "Built with React and localStorage, so everything lives in the browser with no backend required. Notes auto-save as you type, search works across both title and content, and deleting a note sends it to a trash folder rather than removing it immediately. You can restore from trash or clear it when you're sure.\n\nA favorites system lets you star notes for quick access without reorganizing anything. The project is still in active development: the foundation is solid and the core workflows work, but the UI has rough edges I'm still smoothing out. I document what's broken and what's next in the repo, because pretending a project is finished when it isn't doesn't help anyone.",
    stack: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Lucide React",
    ],
    coreStack: ["React", "JavaScript", "Tailwind CSS"],
    whatILearned:
      "That the gap between a working CRUD app and something that actually feels usable is mostly in the small decisions: what happens when you delete something, whether search is instant, whether the app remembers where you left off.",
    links: {
      live: "https://z-boook.vercel.app",
      github: "https://github.com/Zolender/Notebook-with-React",
    },
    screenshots: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
