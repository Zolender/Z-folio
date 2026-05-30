import SectionWrapper from "../shared/SectionWrapper";
import { about } from "../../data/content";

export default function About() {
  return (
    <SectionWrapper id="about" className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-(--color-text) mb-10">About</h2>
      <div className="flex flex-col gap-6">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="text-(--color-text-muted) leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </SectionWrapper>
  );
}
