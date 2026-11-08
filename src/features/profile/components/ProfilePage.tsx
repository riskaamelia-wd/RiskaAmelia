import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/config/profile";
import { TechnologyGarden } from "./TechnologyGarden";
import { getTechnologyEntries } from "../technologies";
import { SITE } from "@/config/site";
export function ProfilePage() {
  return (
    <article className="page-shell profile-page">
      <Link href="/#about" className="text-link mb-8">
        <ArrowLeft size={16} aria-hidden="true" /> Back to the person
      </Link>
      <div className="flex items-center gap-6">
        <Image
          src="/images/riska-portrait.webp"
          alt="Riska Amelia"
          width={160}
          height={200}
          className="h-30 w-24 shrink-0 border border-border object-cover md:h-50 md:w-40"
        />
        <div>
          <h1 className="section-heading">Riska Amelia.</h1>
          <p className="mt-3 text-muted-foreground">
            {PROFILE.role} · {PROFILE.location}
          </p>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-bio">
          {PROFILE.about.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        <TechnologyGarden technologies={getTechnologyEntries()} />
        <section
          className="profile-experience"
          aria-labelledby="experience-title"
        >
          <h2 id="experience-title" className="mb-7 font-serif text-4xl">
            Experience
          </h2>
          <ol className="profile-experience-list">
            {PROFILE.experience.map((entry) => (
              <li key={entry.organization}>
                <p className="profile-experience-date text-muted-foreground">
                  {entry.dates}
                </p>
                <div className="profile-experience-detail">
                  <h3 className="font-serif text-3xl">{entry.role}</h3>
                  <p className="mt-2">{entry.organization}</p>
                  <p className="mt-3 text-muted-foreground">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="profile-education border-t pt-7"
          aria-labelledby="education-title"
        >
          <h2 id="education-title" className="font-serif text-4xl">
            Education
          </h2>
          <p className="mt-5">{PROFILE.education.institution}</p>
          <p className="mt-2 text-muted-foreground">
            {PROFILE.education.dates}
          </p>
        </section>
        <a className="text-link profile-source" href={SITE.linkedin}>
          Source: LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
