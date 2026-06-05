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
        staggerChildren: reduced ? 0 : 0.1,
        delayChildren: reduced ? 0 : 0.38,
      },
    },
    past: {},
  };

  return (
    <SectionWrapper id="skills" from="left">
      <div className="max-w-3xl mx-auto w-full">

        {/* Heading block */}
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-semibold tracking-tight text-ink mb-2"
        >
          Skills
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-sm text-muted mb-8 max-w-xs"
        >
          What I reach for, and what I&apos;m building on.
        </motion.p>

        {/* Top rule */}
        <motion.div
          variants={fadeUp}
          className="h-px bg-white/8 mb-0"
        />

        {/* Skill groups — definition-list style */}
        <motion.div variants={groupStagger} className="flex flex-col">
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-10 gap-y-3 py-6 border-b border-white/5 last:border-b-0"
            >
              <p
                className={`text-sm font-medium mt-0.5 shrink-0 ${
                  group.learning ? "text-muted/50 italic" : "text-muted"
                }`}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <StackTag
                    key={tool}
                    label={tool}
                    variant={
                      group.highlighted
                        ? "core"
                        : group.learning
                        ? "learning"
                        : "supporting"
                    }
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
