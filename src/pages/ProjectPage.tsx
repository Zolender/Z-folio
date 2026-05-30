import { useParams, useNavigate } from "react-router";
import { getProjectBySlug } from "../data/projects";
import StackTag from "../components/shared/StackTag";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug ?? "");

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[var(--color-text-muted)]">
        <p className="mb-4">Project not found.</p>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-[var(--color-accent)] hover:underline"
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
        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-10 flex items-center gap-2 transition-colors"
      >
        ← Back
      </button>

      <p className="text-sm text-[var(--color-text-muted)] mb-2">{project.name}</p>
      <h1 className="text-4xl font-semibold text-[var(--color-text)] mb-4 leading-tight">
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
        <div className="flex gap-4 overflow-x-auto pb-4 mb-10">
          {project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className="h-48 rounded-xl object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      <div className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line mb-10">
        {project.description}
      </div>

      <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-10">
        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-2">
          What I learned
        </p>
        <p className="text-[var(--color-text-muted)] leading-relaxed">
          {project.whatILearned}
        </p>
      </div>

      <div className="flex gap-4">
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Live site
        </a>
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
