import { ContentImage } from "@/components/common/ContentImage";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types/project";
export function ProjectCard({ project }: { project: Project }) {
  const visual = project.artwork ?? project.image;
  return (
    <a href={`/projects/${project.slug}`} className="project-painting-link">
      <figure>
        <div className="project-painting-frame">
          <div className="project-painting-mat">
            <div
              className="project-painting-canvas"
              style={{ viewTransitionName: `project-cover-${project.slug}` }}
            >
              {visual ? (
                <ContentImage
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  sizes="(max-width: 767px) 84vw, (max-width: 1099px) 68vw, 390px"
                  className="project-painted-image"
                />
              ) : (
                <span className="project-unpainted">Project notes</span>
              )}
            </div>
          </div>
        </div>
        <figcaption className="project-painting-caption">
          <span className="project-painting-kind">
            {project.artwork ? "Painted cover study" : "Project preview"}
          </span>
          <h2>
            {project.title}
            <ArrowUpRight size={20} aria-hidden="true" />
          </h2>
          <p className="project-painting-summary">{project.summary}</p>
          {project.technologies.length ? (
            <p className="project-painting-medium" aria-label="Technologies">
              {project.technologies.join(" · ")}
            </p>
          ) : null}
          <span className="project-painting-open">
            Explore the project <span aria-hidden="true">↗</span>
          </span>
        </figcaption>
      </figure>
    </a>
  );
}
