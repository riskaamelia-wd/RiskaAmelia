import type { Metadata } from "next";
import { getProject } from "./content";
export function getProjectMetadata(slug: string): Metadata {
  const project = getProject(slug);
  return project
    ? { title: project.title, description: project.summary }
    : { title: "Project not found", robots: { index: false } };
}
