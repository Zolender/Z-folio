import SectionWrapper from "../shared/SectionWrapper";
import ProjectCard from "../project/ProjectCard";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-3xl mx-auto w-full mb-10">
        <p className="text-xs tracking-widest uppercase text-muted">
          Projects
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-canvas to-transparent" />
      </div>
    </SectionWrapper>
  );
}
