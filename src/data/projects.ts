import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "CineSearch",
    slug: "cinesearch",
    oneLiner:
      "A movie and series discovery app where users can search titles, explore details, save favorites, and pick up right where they left off, without losing their searches between sessions.",
    description:
      "The interesting part isn't the search, it's the state. When a user leaves the search page and comes back, Redux keeps their results alive: no refetch, no blank slate. Framer Motion handles the transitions so the whole thing feels smooth rather than snappy.",
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
      "The first project I built with a proper frontend/backend separation: two separate folders, two separate deployments, one coherent system. JWT authentication with session rehydration on page load, role-based access enforced at the API level not just the UI, Zod for schema validation, Helmet and rate limiting for security. The architecture diagram and database schema are documented in the repo.\n\nUsers can write with markdown, like and comment on posts, and admins can manage the whole platform from a dedicated panel.",
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
      "An inventory management system for agricultural distributors across Rwanda.",
    description:
      "Managers track stock in real time, analysts read dashboards and filter by region, product, or date, and admins control who sees what. Built to handle the actual complexity of supply chain work.\n\nI'm the only full-stack developer on the team, working alongside AI engineers with a roadmap that includes AI-powered features down the line. The system supports CSV bulk import with granular error reporting, low stock alerts, multi-region tracking, and role-based access across three permission tiers.",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    coreStack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    whatILearned:
      "How to build for a team and a real use case at the same time, and that being the only full-stack dev teaches you resilience, patience, and a certain attention to detail you don't develop any other way.",
    links: {
      live: "https://agrihub-z.vercel.app",
      github: "https://github.com/Zolender/Agri-hub",
    },
    screenshots: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
