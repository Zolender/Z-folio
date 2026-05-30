import SectionWrapper from "../shared/SectionWrapper";
import { about } from "../../data/content";

export default function About() {
  const last = about.paragraphs.length - 1;

  return (
    <SectionWrapper id="about">
      <div className="max-w-3xl mx-auto w-full">
        <p className="text-xs tracking-widest uppercase text-(--color-text-muted) mb-10">
          About
        </p>
        <div className="flex flex-col gap-6">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-lg text-(--color-text-muted) leading-relaxed"
                  : i === last
                  ? "text-base font-semibold text-(--color-text) leading-relaxed"
                  : "text-base text-(--color-text-muted) leading-relaxed"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
