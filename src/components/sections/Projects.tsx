import SectionWrapper from "../shared/SectionWrapper";
import ProjectCard from "../project/ProjectCard";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-10 max-w-4xl mx-auto">
        Projects
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 max-w-4xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
