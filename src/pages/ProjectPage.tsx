import { motion, useScroll, useSpring } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getProjectBySlug, getProjectNavigation } from "../data/projects";
import StackTag from "../components/shared/StackTag";
import { GithubIcon } from "../components/shared/BrandIcons";
import { useMotion } from "../hooks/useMotion";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");
  const nav = getProjectNavigation(slug ?? "");
  const { fadeUp, stagger } = useMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-muted">
        <p className="mb-4">Project not found.</p>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-accent hover:underline"
        >
          Back home
        </button>
      </div>
    );
  }

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" as const },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-60"
        style={{ scaleX }}
      />
    <div className="max-w-3xl mx-auto px-6 py-32">
      {/* Back + position in series */}
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
          className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        {nav && (
          <span className="text-xs tracking-widest uppercase text-muted/70 tabular-nums">
            Project {nav.index + 1} / {nav.total}
          </span>
        )}
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase text-muted mb-3">
          {project.name}
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-4xl font-semibold tracking-tight text-ink leading-tight mb-8">
          {project.oneLiner}
        </motion.h1>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-12">
          {project.coreStack.map((tech) => (
            <StackTag key={tech} label={tech} variant="core" />
          ))}
          {project.stack
            .filter((t) => !project.coreStack.includes(t))
            .map((tech) => (
              <StackTag key={tech} label={tech} />
            ))}
        </motion.div>

        {project.screenshots.length > 0 && (
          <motion.div variants={fadeUp} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mb-12">
            {project.screenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.name} screenshot ${i + 1}`}
                className="h-48 rounded-xl object-cover shrink-0"
              />
            ))}
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mb-12">
          {project.description.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-muted leading-relaxed mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="border-l-2 border-accent pl-6 mb-12">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">
            What I learned
          </p>
          <p className="text-muted leading-relaxed">{project.whatILearned}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-4">
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-on-accent text-sm font-semibold hover:bg-accent-dim transition-colors"
          >
            Live site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-edge text-muted text-sm hover:border-accent hover:text-ink transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Prev / next project navigation */}
      {nav && nav.total > 1 && (
        <div className="mt-20 pt-8 border-t border-white/8 grid grid-cols-2 gap-4">
          <Link
            to={`/projects/${nav.prev.slug}`}
            className="group flex flex-col gap-1 rounded-2xl border border-white/6 bg-surface/50 p-5 hover:border-accent/40 transition-colors"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted group-hover:text-accent transition-colors">
              <ArrowLeft className="w-3 h-3" /> Previous
            </span>
            <span className="text-sm font-medium text-ink">{nav.prev.name}</span>
          </Link>
          <Link
            to={`/projects/${nav.next.slug}`}
            className="group flex flex-col items-end gap-1 rounded-2xl border border-white/6 bg-surface/50 p-5 text-right hover:border-accent/40 transition-colors"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted group-hover:text-accent transition-colors">
              Next <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium text-ink">{nav.next.name}</span>
          </Link>
        </div>
      )}
    </div>
    </motion.div>
  );
}
