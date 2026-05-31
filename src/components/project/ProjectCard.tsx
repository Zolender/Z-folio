import { ArrowRight } from "lucide-react";
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
      role="button"
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="cursor-pointer group shrink-0 w-80 flex flex-col justify-between gap-8 p-6 rounded-2xl border border-edge bg-surface hover:border-accent transition-colors"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-ink">{project.name}</h3>
        <p className="text-sm text-muted leading-relaxed">{project.oneLiner}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {project.coreStack.map((tech) => (
            <StackTag key={tech} label={tech} variant="core" />
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors">
          View project <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
