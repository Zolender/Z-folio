import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import ProjectCard from "../project/ProjectCard";
import { useMotion } from "../../hooks/useMotion";
import { projects } from "../../data/projects";

// Duplicate cards so the scroll can loop seamlessly
const loopedProjects = [...projects, ...projects];

export default function Projects() {
  const { reduced, fadeUp } = useMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Infinite scroll loop: when scrollLeft reaches the second set, jump back to the first
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || reduced) return;

    function onScroll() {
      if (!el) return;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const mobileStagger = {
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
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-semibold tracking-tight text-ink mb-3"
        >
          Projects
        </motion.h2>
        <motion.div variants={fadeUp} className="h-px bg-line mb-10" />
      </div>

      {/* Desktop / tablet — infinite horizontal carousel */}
      <div className="relative hidden md:block">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6"
        >
          {loopedProjects.map((project, i) => (
            <ProjectCard key={`${project.slug}-${i}`} project={project} />
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-canvas to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-canvas to-transparent" />
      </div>

      {/* Mobile — vertical full-width stack */}
      <motion.div
        variants={mobileStagger}
        className="flex flex-col gap-4 px-6 md:hidden"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={fadeUp}>
            <ProjectCard project={project} className="w-full" />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
