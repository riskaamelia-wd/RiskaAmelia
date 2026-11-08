export interface ProjectSection {
  heading: string;
  body: string;
}
export interface Project {
  slug: string;
  title: string;
  summary: string;
  technologies: readonly string[];
  artwork?: { src: string; alt: string };
  image?: { src: string; alt: string; width: number; height: number };
  liveUrl?: string;
  repositoryUrl?: string;
  role?: string;
  sourceUrl?: string;
  sections?: readonly ProjectSection[];
}
