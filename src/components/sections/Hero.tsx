import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "../shared/SectionWrapper";
import MaskedText from "../shared/MaskedText";
import { useMotion } from "../../hooks/useMotion";
import { useMagnetic } from "../../hooks/useMagnetic";
import { hero } from "../../data/content";

// Pointer capability is fixed for the session — compute once at module load
// rather than on every render (matches ProjectCard / CommandHint).
const hasFinePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

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

  if (reduced || !hasFinePointer) {
    return <a href={href} className={className}>{children}</a>;
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

const ARC_R = 95;
const ARC_CIRC = 2 * Math.PI * ARC_R; // ≈ 597

export default function Hero() {
  const { reduced } = useMotion();
  const { scrollY } = useScroll();

  // Scroll-driven depth pull
  const scrollY_ = useTransform(scrollY, [0, 600], reduced ? [0, 0] : [0, -120]);
  const scrollOpacity = useTransform(scrollY, [0, 400], reduced ? [1, 1] : [1, 0]);
  const scrollScale = useTransform(scrollY, [0, 600], reduced ? [1, 1] : [1, 0.92]);

  // Scroll-driven counter-rotation for the decorative arcs (subtle parallax)
  const arcRotate = useTransform(scrollY, [0, 700], reduced ? [0, 0] : [0, 22]);
  const arcRotateSmall = useTransform(scrollY, [0, 700], reduced ? [0, 0] : [0, -18]);

  // Mouse-driven perspective tilt (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-2.5, 2.5]), {
    stiffness: 140,
    damping: 28,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 140,
    damping: 28,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !hasFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <SectionWrapper className="min-h-screen flex flex-col justify-center" noAnimation>
      <motion.div style={{ y: scrollY_, opacity: scrollOpacity, scale: scrollScale }}>
        <motion.div
          className="max-w-5xl mx-auto w-full"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {/* Perspective tilt wrapper — this is the "camera plane" */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
            style={{ rotateX, rotateY, transformPerspective: 1100 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Text */}
            <div>
              {/* Tagline — desktop shows alone, mobile shows without photo */}
              <p className="text-xs tracking-widest uppercase text-muted mb-6">
                {hero.tagline}
              </p>
              <MaskedText
                as="h1"
                text={hero.name}
                trigger="mount"
                delay={0.15}
                className="text-5xl md:text-6xl font-semibold tracking-tight text-ink leading-tight mb-8"
              />
              <p className="text-lg text-muted max-w-md leading-relaxed mb-10">
                {hero.bio}
              </p>
              <div className="flex gap-4 flex-wrap">
                <MagneticLink
                  href={hero.ctas.primary.href}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-on-accent text-sm font-semibold hover:bg-accent-dim transition-colors"
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

            {/* Photo column — desktop only */}
            <motion.div
              className="hidden md:flex justify-end"
              initial={reduced ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <div className="relative">

                {/* Accent glow — light source behind the photo */}
                <div
                  className="absolute inset-0 -z-10 blur-3xl rounded-full scale-110"
                  style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
                />

                {/* Geometric SVG arc — structural frame around the photo.
                    Draws itself on load, then counter-rotates on scroll. */}
                <motion.svg
                  className="absolute -top-6 -right-6 w-48 h-48 md:w-56 md:h-56 pointer-events-none -z-10"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden
                  style={{ rotate: arcRotate, transformOrigin: "center" }}
                >
                  {/* Large arc — 3/4 circle */}
                  <motion.circle
                    cx="100" cy="100" r={ARC_R}
                    stroke="rgba(139,92,246,0.18)"
                    strokeWidth="1"
                    strokeDasharray={`${ARC_CIRC * 0.75} ${ARC_CIRC}`}
                    strokeLinecap="round"
                    initial={reduced ? false : { strokeDashoffset: ARC_CIRC * 0.875 }}
                    animate={{ strokeDashoffset: ARC_CIRC * 0.125 }}
                    transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  />
                  {/* Inner accent dot — compass point */}
                  <motion.circle
                    cx="100" cy="5" r="2" fill="rgba(139,92,246,0.5)"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.5 }}
                  />
                </motion.svg>

                {/* Second small arc — bottom-left, counterbalances */}
                <motion.svg
                  className="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none -z-10"
                  viewBox="0 0 80 80"
                  fill="none"
                  aria-hidden
                  style={{ rotate: arcRotateSmall, transformOrigin: "center" }}
                >
                  <motion.circle
                    cx="40" cy="40" r="34"
                    stroke="rgba(139,92,246,0.12)"
                    strokeWidth="1"
                    strokeDasharray="54 214"
                    strokeLinecap="round"
                    initial={reduced ? false : { strokeDashoffset: 27 }}
                    animate={{ strokeDashoffset: -27 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                  />
                </motion.svg>

                {/* Photo card */}
                <div
                  className="group relative w-44 h-56 md:w-64 md:h-80 rounded-3xl overflow-hidden ring-1 ring-accent/25 shrink-0"
                  style={{ boxShadow: "0 8px 48px rgba(139,92,246,0.14)" }}
                >
                  <img
                    src="/me.jpg"
                    alt="Eben-Ezer Ndeingar"
                    width={992}
                    height={1000}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Diagonal shine on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/12 to-transparent -skew-x-12" />
                  </div>
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-linear-to-t from-canvas/70 to-transparent pointer-events-none" />
                </div>

              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
