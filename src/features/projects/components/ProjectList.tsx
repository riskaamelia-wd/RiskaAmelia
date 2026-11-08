import { PROJECTS } from "../content";
import { ProjectCard } from "./ProjectCard";
import { ContentEmpty } from "@/components/common/ContentEmpty";
import "@/styles/project-gallery.css";
export function ProjectList() {
  if (!PROJECTS.length) return <ContentEmpty kind="projects" />;
  return (
    <>
      <p className="project-gallery-note">
        <span>{PROJECTS.length} projects</span>
        <span>Original painted covers, with my project stories inside.</span>
      </p>
      <ul className="project-gallery" aria-label="Project gallery">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
