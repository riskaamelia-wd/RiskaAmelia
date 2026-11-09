import { ContentImage } from "@/components/common/ContentImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject } from "../content";
import { Badge } from "@/components/ui/badge";
export function ProjectDetail({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();
  const cover = project.artwork ?? project.image;
  return (
    <article className="page-shell py-16">
      <Link href="/projects" className="text-link mb-10">
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>
      {cover ? (
        <figure className="project-detail-artwork">
          <div style={{ viewTransitionName: `project-cover-${project.slug}` }}>
            <ContentImage
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(max-width: 767px) 100px, 220px"
            />
          </div>
          <figcaption>
            {project.artwork ? "Painted cover study" : "Project preview"}
          </figcaption>
        </figure>
      ) : null}
      <h1 className="section-heading">{project.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {project.summary}
      </p>
      <div className="my-8 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <Badge variant="secondary" key={technology}>
            {technology}
          </Badge>
        ))}
      </div>
      {project.artwork && project.image ? (
        <ContentImage
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(max-width: 1440px) 90vw, 1280px"
          className="mb-10 h-auto w-full rounded-2xl"
        />
      ) : null}
      {project.role ? (
        <p className="mb-8">
          <strong>My role:</strong> {project.role}
        </p>
      ) : null}
      {project.sections?.length ? (
        <div className="project-discussion">
          {project.sections.map((section, index) => (
            <section
              key={section.heading}
              className="project-discussion-section"
              aria-labelledby={`discussion-${index}`}
            >
              <h2 id={`discussion-${index}`}>{section.heading}</h2>
              {section.body.split("\n\n").map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-8">
        {project.sourceUrl ? (
          <a className="text-link" href={project.sourceUrl}>
            Source: LinkedIn{" "}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
        {project.liveUrl ? (
          <a className="text-link" href={project.liveUrl}>
            Visit website <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
        {project.repositoryUrl ? (
          <a className="text-link" href={project.repositoryUrl}>
            View source <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
