import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import ProjectCard from "../project/ProjectCard";
import { useMotion } from "../../hooks/useMotion";
import { projects } from "../../data/projects";

export default function Projects() {
  const { reduced, fadeUp } = useMotion();

  const cardStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.1,
        delayChildren: reduced ? 0 : 0.28,
      },
    },
    past: {},
  };

  return (
    <SectionWrapper id="projects" from="right">
      <motion.p
        variants={fadeUp}
        className="max-w-3xl mx-auto w-full mb-10 text-xs tracking-widest uppercase text-muted"
      >
        Projects
      </motion.p>
      <div className="relative">
        <motion.div
          variants={cardStagger}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp} className="shrink-0">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-canvas to-transparent" />
      </div>
    </SectionWrapper>
  );
}
