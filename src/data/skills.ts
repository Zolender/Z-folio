export interface SkillGroup {
  category: string;
  tools: string[];
  highlighted?: boolean;
  learning?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    tools: ["React", "TypeScript", "Redux Toolkit", "React Router", "Tailwind CSS", "Framer Motion"],
    highlighted: true,
  },
  {
    category: "Backend",
    tools: ["Node.js", "Express", "PostgreSQL", "Supabase", "JWT", "Bcrypt", "Zod"],
    highlighted: true,
  },
  {
    category: "Tooling",
    tools: ["Vite", "Git", "GitHub", "Postman", "Prisma"],
  },
  {
    category: "Deployment",
    tools: ["Vercel", "Render", "Supabase", "Namecheap"],
  },
  {
    category: "Currently deepening",
    tools: ["MongoDB", "WebSockets", "Socket.io"],
    learning: true,
  },
];
