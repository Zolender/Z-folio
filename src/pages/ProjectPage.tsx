import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import StackTag from "../components/shared/StackTag";
import { GithubIcon } from "../components/shared/BrandIcons";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");

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
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
    <div className="max-w-3xl mx-auto px-6 py-32">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted hover:text-ink mb-12 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      <p className="text-xs tracking-widest uppercase text-muted mb-3">
        {project.name}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink leading-tight mb-8">
        {project.oneLiner}
      </h1>

      <div className="flex flex-wrap gap-2 mb-12">
        {project.coreStack.map((tech) => (
          <StackTag key={tech} label={tech} variant="core" />
        ))}
        {project.stack
          .filter((t) => !project.coreStack.includes(t))
          .map((tech) => (
            <StackTag key={tech} label={tech} />
          ))}
      </div>

      {project.screenshots.length > 0 && (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mb-12">
          {project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className="h-48 rounded-xl object-cover shrink-0"
            />
          ))}
        </div>
      )}

      <div className="mb-12">
        {project.description.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-muted leading-relaxed mb-6 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="border-l-2 border-accent pl-6 mb-12">
        <p className="text-xs tracking-widest uppercase text-muted mb-3">
          What I learned
        </p>
        <p className="text-muted leading-relaxed">{project.whatILearned}</p>
      </div>

      <div className="flex gap-4">
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-sm font-semibold hover:bg-accent-dim transition-colors"
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
      </div>
    </div>
    </motion.div>
  );
}
