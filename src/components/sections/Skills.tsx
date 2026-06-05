import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import StackTag from "../shared/StackTag";
import { useMotion } from "../../hooks/useMotion";
import { skillGroups } from "../../data/skills";

export default function Skills() {
  const { reduced, fadeUp } = useMotion();

  const groupStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.11,
        delayChildren: reduced ? 0 : 0.3,
      },
    },
    past: {},
  };

  return (
    <SectionWrapper id="skills" from="left">
      <div className="max-w-3xl mx-auto w-full">
        <motion.p
          variants={fadeUp}
          className="text-xs tracking-widest uppercase text-muted mb-10"
        >
          Skills
        </motion.p>
        <motion.div variants={groupStagger} className="flex flex-col gap-8">
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={fadeUp}>
              <p className="text-xs tracking-wide uppercase text-muted mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <StackTag
                    key={tool}
                    label={tool}
                    variant={group.highlighted ? "core" : group.learning ? "learning" : "supporting"}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
