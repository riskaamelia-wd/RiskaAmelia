import { ContentImage } from "@/components/common/ContentImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types/project";
import { Badge } from "@/components/ui/badge";
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-none border bg-card"
    >
      {project.image ? (
        <div className="overflow-hidden">
          <ContentImage
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-4 p-7">
        <h3 className="flex items-center justify-between gap-4 font-serif text-3xl font-normal">
          {project.title}
          <ArrowUpRight aria-hidden="true" className="size-6 shrink-0" />
        </h3>
        <p className="leading-7 text-muted-foreground">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Badge variant="secondary" key={technology}>
              {technology}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
