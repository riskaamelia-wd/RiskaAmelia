import { PROJECTS } from "../content";
import { ProjectCard } from "./ProjectCard";
import { ContentEmpty } from "@/components/common/ContentEmpty";
export function ProjectList() {
  if (!PROJECTS.length) return <ContentEmpty kind="projects" />;
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {PROJECTS.map((project) => (
        <ProjectCard project={project} key={project.slug} />
      ))}
    </div>
  );
}
