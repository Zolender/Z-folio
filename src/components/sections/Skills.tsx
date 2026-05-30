import SectionWrapper from "../shared/SectionWrapper";
import StackTag from "../shared/StackTag";

const skillGroups = [
  {
    category: "Frontend",
    tools: ["React", "TypeScript", "Redux Toolkit", "React Router", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "Express", "PostgreSQL", "Supabase", "JWT", "Bcrypt", "Zod"],
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
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-10">
        Skills
      </h2>
      <div className="flex flex-col gap-8">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <StackTag key={tool} label={tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
