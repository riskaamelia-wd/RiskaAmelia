import type { Project } from "./types/project";
import { SITE } from "@/config/site";
// Verified against the public LinkedIn profile on 2026-11-08.
// No screenshots, demo URLs or repository URLs were supplied by that source.
export const PROJECTS: readonly Project[] = [
  {
    slug: "simdiklat",
    title: "SIMDIKLAT",
    summary:
      "Training-management redevelopment: planning, participants, attendance, certificates, scoring, and evaluation.",
    technologies: ["Next.js", "TypeORM", "Oracle SQL"],
    role: "Software Engineer",
    sourceUrl: SITE.linkedin,
  },
  {
    slug: "simfoni",
    title: "SIMFONI",
    summary:
      "Legacy Laravel application rebuilt with new interfaces, APIs, and database structures.",
    technologies: ["Next.js", "Node.js"],
    role: "Software Engineer",
    sourceUrl: SITE.linkedin,
  },
  {
    slug: "musrenbangkom",
    title: "MUSRENBANGKOM",
    summary:
      "Responsive frontend with tables, approval flows, and API-driven interactions.",
    technologies: ["Next.js", "Tailwind CSS"],
    role: "Software Engineer",
    sourceUrl: SITE.linkedin,
  },
  {
    slug: "classy",
    title: "Classy",
    summary: "B2C e-commerce mini-project at Alterra Academy.",
    technologies: ["React", "GraphQL", "Hasura"],
    sourceUrl: SITE.linkedin,
  },
  {
    slug: "gofit",
    title: "GoFit",
    summary:
      "Collaborative gym-management capstone with design, mobile, backend, and QA teams.",
    technologies: [],
    sourceUrl: SITE.linkedin,
  },
];
export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
export function getProjectStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}
