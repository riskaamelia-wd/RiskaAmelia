import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ContentImage } from "@/components/common/ContentImage";
import type { Project } from "@/features/projects/types/project";
export function ProjectReflections({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [selected, setSelected] = useState(0);
  const scope = useRef<HTMLElement>(null);
  const project = projects[selected];
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".reflection-artwork img",
          { scale: 1.08 },
          { scale: 1, duration: 0.8, ease: "power3.out" },
        );
      });
      scope.current
        ?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
        ?.scrollIntoView({ block: "nearest", inline: "nearest" });
      return () => media.revert();
    },
    { scope, dependencies: [selected], revertOnUpdate: true },
  );
  if (!project) return null;
  const artwork = project.artwork ?? project.image;
  return (
    <aside
      ref={scope}
      className="project-reflections living-exhibition"
      aria-label="Discover my projects"
    >
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
            {item.artwork ? (
              <ContentImage
                src={item.artwork.src}
                alt=""
                width={64}
                height={48}
                sizes="48px"
              />
            ) : (
              <span className="reflection-petal" aria-hidden="true" />
            )}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div className="reflection-selected">
        {artwork ? (
          <a
            href={`/projects/${project.slug}`}
            className="reflection-artwork"
            style={{ viewTransitionName: `project-cover-${project.slug}` }}
            aria-label={`Open ${project.title} project`}
          >
            <ContentImage
              src={artwork.src}
              alt={artwork.alt}
              fill
              sizes="(max-width: 767px) 100px, 380px"
            />
            <span className="reflection-artwork-invitation">
              Enter this work <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </a>
        ) : null}
        <div className="reflection-story" aria-live="polite" aria-atomic="true">
          <div className="reflection-controls">
            <span className="reflection-counter">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <div>
              <button
                type="button"
                aria-label="Previous project"
                onClick={() =>
                  setSelected(
                    (selected + projects.length - 1) % projects.length,
                  )
                }
              >
                <ArrowLeft size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => setSelected((selected + 1) % projects.length)}
              >
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          {project.technologies.length ? (
            <p className="reflection-technologies">
              {project.technologies.join(" · ")}
            </p>
          ) : null}
          <a href={`/projects/${project.slug}`} className="journey-action">
            Explore this project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
}
