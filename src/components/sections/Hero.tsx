import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "../shared/SectionWrapper";
import { useMotion } from "../../hooks/useMotion";
import { useMagnetic } from "../../hooks/useMagnetic";
import { hero } from "../../data/content";

function MagneticLink({
  href,
  className,
  children,
  reduced,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  reduced: boolean | null;
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.32);
  const hasFinePointer =
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  if (reduced || !hasFinePointer) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.a>
  );
}

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
          className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {/* Text */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-6">
              {hero.tagline}
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-ink leading-tight mb-8">
              {hero.name}
            </h1>
            <p className="text-lg text-muted max-w-md leading-relaxed mb-10">
              {hero.bio}
            </p>
            <div className="flex gap-4">
              <MagneticLink
                href={hero.ctas.primary.href}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-sm font-semibold hover:bg-accent-dim transition-colors"
                reduced={reduced}
              >
                {hero.ctas.primary.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticLink>
              <MagneticLink
                href={hero.ctas.secondary.href}
                className="px-6 py-3 rounded-full border border-edge text-muted text-sm hover:text-ink hover:border-accent transition-colors"
                reduced={reduced}
              >
                {hero.ctas.secondary.label}
              </MagneticLink>
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center md:justify-end order-first md:order-last">
            <div className="relative">
              <img
                src="/me.jpg"
                alt="Eben-Ezer Ndeingar"
                className="w-56 h-72 md:w-64 md:h-80 object-cover object-top rounded-3xl ring-1 ring-accent/25"
                style={{ boxShadow: "0 8px 48px rgba(139, 92, 246, 0.14)" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
