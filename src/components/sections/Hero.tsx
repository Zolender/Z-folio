import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "../shared/SectionWrapper";
import { useMotion } from "../../hooks/useMotion";
import { hero } from "../../data/content";

export default function Hero() {
  const { reduced } = useMotion();
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], reduced ? [0, 0] : [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], reduced ? [1, 1] : [1, 0]);
  const scale = useTransform(scrollY, [0, 600], reduced ? [1, 1] : [1, 0.92]);

  return (
    <SectionWrapper className="min-h-screen flex flex-col justify-center" noAnimation>
      <motion.div style={{ y, opacity, scale }}>
        <motion.div
          className="max-w-3xl mx-auto w-full"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="text-xs tracking-widest uppercase text-muted mb-6">
            {hero.tagline}
          </p>
          <h1 className="text-6xl font-semibold tracking-tight text-ink leading-tight mb-8">
            {hero.name}
          </h1>
          <p className="text-lg text-muted max-w-xl leading-relaxed mb-10">
            {hero.bio}
          </p>
          <div className="flex gap-4">
            <a
              href={hero.ctas.primary.href}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-sm font-semibold hover:bg-accent-dim transition-colors"
            >
              {hero.ctas.primary.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={hero.ctas.secondary.href}
              className="px-6 py-3 rounded-full border border-edge text-muted text-sm hover:text-ink hover:border-accent transition-colors"
            >
              {hero.ctas.secondary.label}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
