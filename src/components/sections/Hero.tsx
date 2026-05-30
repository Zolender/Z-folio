import SectionWrapper from "../shared/SectionWrapper";
import { hero } from "../../data/content";

export default function Hero() {
  return (
    <SectionWrapper className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto">
      <p className="text-(--color-text-muted) text-sm mb-4">{hero.tagline}</p>
      <h1 className="text-5xl font-semibold text-(--color-text) leading-tight mb-6">
        {hero.name}
      </h1>
      <p className="text-lg text-(--color-text-muted) max-w-2xl">{hero.bio}</p>
      <div className="flex gap-4 mt-10">
        <a
          href={hero.ctas.primary.href}
          className="px-6 py-3 rounded-full bg-(--color-accent) text-(--color-bg) text-sm font-semibold hover:bg-(--color-accent-hover) transition-colors"
        >
          {hero.ctas.primary.label}
        </a>
        <a
          href={hero.ctas.secondary.href}
          className="px-6 py-3 rounded-full border border-(--color-border) text-(--color-text-muted) text-sm hover:text-(--color-text) hover:border-(--color-accent) transition-colors"
        >
          {hero.ctas.secondary.label}
        </a>
      </div>
    </SectionWrapper>
  );
}
