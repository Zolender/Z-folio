import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { Project } from "../../types";
import StackTag from "../shared/StackTag";
import { useMotion } from "../../hooks/useMotion";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = "w-90 shrink-0" }: ProjectCardProps) {
  const navigate = useNavigate();
  const { reduced } = useMotion();

  function handleOpen(e: React.MouseEvent<HTMLDivElement>) {
    const supportsVT =
      typeof document !== "undefined" && "startViewTransition" in document;
    if (supportsVT && !reduced) {
      // Tag only the clicked card's title — it morphs into the page heading.
      const title = e.currentTarget.querySelector<HTMLElement>("[data-vt-title]");
      if (title) title.style.viewTransitionName = "project-hero";
    }
    navigate(`/projects/${project.slug}`, { viewTransition: !reduced });
  }

  return (
    <motion.div
      role="button"
      onClick={handleOpen}
      className={`cursor-pointer group flex flex-col justify-between gap-10 p-7 rounded-2xl border border-line bg-surface/70 backdrop-blur-sm elevate hover:border-accent/50 transition-colors ${className}`}
      whileHover={reduced ? {} : { y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Chrome accent line at top */}
      <div className="-mx-7 -mt-7 mb-2 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="flex flex-col gap-4">
        <h3 data-vt-title className="text-lg font-semibold text-ink">{project.name}</h3>
        <p className="text-sm text-muted leading-relaxed">{project.oneLiner}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {project.coreStack.map((tech) => (
            <StackTag key={tech} label={tech} variant="core" />
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs text-muted group-hover:text-accent-text transition-colors">
          View project <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}
