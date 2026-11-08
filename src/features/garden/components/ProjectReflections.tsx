import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/features/projects/types/project";
export function ProjectReflections({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  if (!project) return null;
  return (
    <aside className="project-reflections" aria-label="Discover my projects">
      <div
        className="reflection-tabs"
        role="group"
        aria-label="Choose a project"
      >
        {projects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            aria-label={`Discover ${item.title}`}
            className="reflection-tab"
          >
            <span className="reflection-petal" aria-hidden="true" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div
        key={project.slug}
        className="reflection-story"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="reflection-counter">
          {String(selected + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        {project.technologies.length ? (
          <p className="reflection-technologies">
            {project.technologies.join(" · ")}
          </p>
        ) : null}
        <Link href={`/projects/${project.slug}`} className="journey-action">
          Explore this project <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <span className="reflection-waterline" aria-hidden="true" />
    </aside>
  );
}
