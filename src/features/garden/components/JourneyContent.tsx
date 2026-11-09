import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/config/profile";
import { SITE } from "@/config/site";
import { CHAPTERS } from "../chapters";
export function JourneyContent({
  active,
  next,
}: {
  active: number;
  next: () => void;
}) {
  return (
    <div className="journey-content" aria-live="polite" aria-atomic="true">
      <div className="journey-caption">{CHAPTERS[active].caption}</div>
      <h1 className="journey-title" key={active}>
        {CHAPTERS[active].title}
      </h1>
      {active === 0 ? (
        <>
          <p className="journey-copy">
            I’m Riska Amelia. I build things for the web.
            <br />
            This is my small corner of the world.
          </p>
          <button className="journey-action" onClick={next}>
            Scroll into the painting <ArrowDown size={16} aria-hidden="true" />
          </button>
        </>
      ) : null}
      {active === 1 ? (
        <>
          <div className="journey-bio">
            <Image
              src="/images/riska-portrait.webp"
              alt="Riska Amelia"
              width={64}
              height={80}
              className="journey-portrait"
            />
            <p className="journey-copy">Call me Lia. {PROFILE.summary}</p>
          </div>
          <p className="journey-technologies">
            {PROFILE.technologies.slice(0, 4).join(" · ")}
          </p>
          <Link className="journey-action" href="/about">
            Explore my background <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </>
      ) : null}
      {active === 2 ? (
        <>
          <p className="journey-copy">
            Government platforms, training systems, and collaborative projects.
            A few things I’ve helped bring to life.
          </p>
          <Link className="journey-action" href="/projects">
            Visit the collection <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </>
      ) : null}
      {active === 3 ? (
        <>
          <p className="journey-copy">
            What I’m learning, what I’m wondering, and ideas worth keeping. The
            notebook is open, with notes on building things for the web.
          </p>
          <Link className="journey-action" href="/writing">
            Open the notebook <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </>
      ) : null}
      {active === 4 ? (
        <>
          <p className="journey-copy">
            Have an idea to bring to life, or just passing through? There’s
            always room for a conversation.
          </p>
          <a className="journey-action" href={`mailto:${SITE.email}`}>
            Say hello <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <div className="journey-socials">
            <a href={SITE.whatsapp}>WhatsApp</a>
            <a href={SITE.github}>GitHub</a>
            <a href={SITE.linkedin}>LinkedIn</a>
          </div>
        </>
      ) : null}
    </div>
  );
}
