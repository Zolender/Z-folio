export interface Screenshot {
  src: string;
  width: number;
  height: number;
}

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
  screenshots: Screenshot[];
}
