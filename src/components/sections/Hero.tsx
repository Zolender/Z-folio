import SectionWrapper from "../shared/SectionWrapper";

export default function Hero() {
  return (
    <SectionWrapper className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto">
      <p className="text-[var(--color-text-muted)] text-sm mb-4">
        Full-Stack Developer in the Making · Kigali, Rwanda
      </p>
      <h1 className="text-5xl font-semibold text-[var(--color-text)] leading-tight mb-6">
        Eben-Ezer Ndeingar
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
        I care about writing code that is organized, scalable, and maintainable.
        I'm a CS student with about a year left before graduating, building real
        applications while I study, because waiting to finish uni before
        starting felt like the wrong order.
      </p>
      <div className="flex gap-4 mt-10">
        <a
          href="#projects"
          className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          See my work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] text-sm hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
        >
          Get in touch
        </a>
      </div>
    </SectionWrapper>
  );
}
