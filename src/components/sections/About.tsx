import SectionWrapper from "../shared/SectionWrapper";

const paragraphs = [
  "Growing up, I always admired people who could create things. Planning is easy, actually pulling it off is something else.",
  "I loved football for that reason. You could imagine a perfect play in your head, but executing it on the pitch, when it actually worked, that feeling was different. When I got introduced to computers and phones, later than most, I found that same feeling in software. The idea that someone's mind could think ahead, anticipate what a user would do, handle edge cases before they happen, and turn all of it into something people hold in their hands every day, that genuinely amazed me.",
  "I picked up Computer Science at university and knew early it was right. Not just as a career, but as a craft. I spent a long time in the tutorial phase, building things that mostly existed to teach me things, and that period was necessary. It's where I learned how much I didn't know, and why that mattered.",
  "Eventually something shifted. I stopped building to learn and started learning while building.",
  "That shift got sharper through The Gym Rwanda, a structured software engineering program that taught me to care even more about the craft, and pushed me past limits I didn't know I had. The resilience, the depth, the habit of not stopping when something gets hard, that came from there, and from a few other experiences that taught me the same thing: working hard might genuinely be the secret.",
  "No more waiting to be ready, just getting right to it.",
];

export default function About() {
  return (
    <SectionWrapper id="about" className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-10">
        About
      </h2>
      <div className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[var(--color-text-muted)] leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </SectionWrapper>
  );
}
