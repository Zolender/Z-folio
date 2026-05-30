export interface Project {
  name: string;
  slug: string;
  oneLiner: string;
  description: string;
  stack: string[];
  coreStack: string[];
  whatILearned: string;
  links: {
    live: string;
    github: string;
  };
  screenshots: string[];
}
