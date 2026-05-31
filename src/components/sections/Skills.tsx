import SectionWrapper from "../shared/SectionWrapper";
import StackTag from "../shared/StackTag";
import { skillGroups } from "../../data/skills";

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-3xl mx-auto w-full">
        <p className="text-xs tracking-widest uppercase text-muted mb-10">
          Skills
        </p>
        <div className="flex flex-col gap-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p className="text-sm text-muted mb-3">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <StackTag key={tool} label={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
