import { ArrowRight } from "lucide-react";
import SectionWrapper from "../shared/SectionWrapper";
import { hero } from "../../data/content";

export default function Hero() {
  return (
    <SectionWrapper className="min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
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
      </div>
    </SectionWrapper>
  );
}
