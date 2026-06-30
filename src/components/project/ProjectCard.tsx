import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { Project } from "../../types";
import StackTag from "../shared/StackTag";
import { useMotion } from "../../hooks/useMotion";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const isFine =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export default function ProjectCard({ project, className = "w-90 shrink-0" }: ProjectCardProps) {
  const navigate = useNavigate();
  const { reduced } = useMotion();

  // Cursor-driven 3D tilt (desktop only). Springs smooth the motion.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !isFine) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    tiltY.set((px - 0.5) * 6);
    tiltX.set((0.5 - py) * 6);
    // Glare follows the cursor via CSS variables.
    e.currentTarget.style.setProperty("--mx", `${px * 100}%`);
    e.currentTarget.style.setProperty("--my", `${py * 100}%`);
  }

  function onLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

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
      data-cursor-label="View"
      onClick={handleOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden cursor-pointer group flex flex-col justify-between gap-10 p-7 rounded-2xl border border-line bg-surface/70 backdrop-blur-sm elevate hover:border-accent/50 transition-colors ${className}`}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduced ? {} : { y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Cursor-following glare (desktop hover) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 45%)",
        }}
        aria-hidden
      />

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
