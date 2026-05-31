import { useParams, useNavigate } from "react-router";
import { getProjectBySlug } from "../data/projects";
import StackTag from "../components/shared/StackTag";
import { ArrowLeft } from "lucide-react";

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-32">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted hover:text-ink mb-10 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <p className="text-xs tracking-widest uppercase text-muted mb-3">
        {project.name}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink mb-4 leading-tight">
        {project.oneLiner}
      </h1>

      <div className="flex flex-wrap gap-2 my-8">
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
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mb-10">
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

      <div className="text-muted leading-relaxed whitespace-pre-line mb-10">
        {project.description}
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-edge mb-10">
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
          className="px-6 py-3 rounded-full bg-accent text-canvas text-sm font-semibold hover:bg-accent-dim transition-colors"
        >
          Live site
        </a>
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-full border border-edge text-muted text-sm hover:border-accent hover:text-ink transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
