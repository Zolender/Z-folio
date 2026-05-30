import { useNavigate } from "react-router";
import type { Project } from "../../types";
import StackTag from "../shared/StackTag";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="cursor-pointer flex-shrink-0 w-80 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors"
    >
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
        {project.name}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
        {project.oneLiner}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.coreStack.map((tech) => (
          <StackTag key={tech} label={tech} variant="core" />
        ))}
      </div>
    </div>
  );
}
