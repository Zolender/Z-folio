import { motion } from "framer-motion";
import SectionWrapper from "../shared/SectionWrapper";
import { useMotion } from "../../hooks/useMotion";
import { about } from "../../data/content";

export default function About() {
  const { reduced, fadeUp } = useMotion();
  const last = about.paragraphs.length - 1;

  const paragraphStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.09,
        delayChildren: reduced ? 0 : 0.42,
      },
    },
    past: {},
  };

  return (
    <SectionWrapper id="about" from="left">
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-semibold tracking-tight text-ink mb-3"
        >
          About
        </motion.h2>
        <motion.div variants={fadeUp} className="h-px bg-line mb-10" />
        <motion.div variants={paragraphStagger} className="flex flex-col gap-6">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className={
                i === 0
                  ? "text-lg text-muted leading-relaxed"
                  : i === last
                  ? "text-base font-semibold text-ink leading-relaxed"
                  : "text-base text-muted leading-relaxed"
              }
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
