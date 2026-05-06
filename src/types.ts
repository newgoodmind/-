export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  featured: FeaturedProject[];
  archive: ArchiveProject[];
  skills: string[];
  process: ProcessStep[];
  contact: ContactData;
  uiLabels?: UILabels;
}

export interface UILabels {
  viewCase: string;
  selectedProject: string;
  role: string;
  impact: string;
  credit: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  links: { label: string; url: string }[];
}

export interface AboutData {
  image: string;
  title: string;
  description: string;
  cards: { title: string; icon: string }[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  role: string;
  contribution: string;
  result: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

export interface ArchiveProject {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ContactData {
  title?: string;
  subtitle?: string;
  email: string;
  instagram: string;
  youtube: string;
}
