import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { Project } from "../../types";
import StackTag from "../shared/StackTag";
import { useMotion } from "../../hooks/useMotion";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { reduced } = useMotion();

  return (
    <motion.div
      role="button"
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="cursor-pointer group shrink-0 w-80 flex flex-col justify-between gap-8 p-6 rounded-2xl border border-white/6 bg-surface/70 backdrop-blur-sm hover:border-accent/50 transition-colors"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
      whileHover={reduced ? {} : { y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
    </motion.div>
  );
}
