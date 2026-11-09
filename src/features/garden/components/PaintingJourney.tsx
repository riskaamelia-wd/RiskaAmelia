"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useChapterHash } from "../hooks/useChapterHash";
import { useGardenPresence } from "../hooks/useGardenPresence";
import { GardenTableaux } from "./GardenTableaux";
import { PaintedPigments } from "./PaintedPigments";
import { useChapterChoreography } from "../hooks/useChapterChoreography";
import { PaintingScenes } from "./PaintingScenes";
import { JourneyContent } from "./JourneyContent";
import { JourneyNavigation } from "./JourneyNavigation";
import { CHAPTERS } from "../chapters";
import {
  getChapterIndex,
  getChapterScrollTop,
} from "../utils/chapter-progress";
import { CatGuide } from "./CatGuide";
import { ProjectReflections } from "./ProjectReflections";
import { WaterRipples } from "./WaterRipples";
import { GardenNotebook } from "./GardenNotebook";
import type { Project } from "@/features/projects/types/project";
import { SITE } from "@/config/site";
import "@/styles/garden.css";
import "@/styles/garden-experience.css";
import "@/styles/living-garden.css";
import "@/styles/painted-scroll.css";
import "@/styles/cat-guide.css";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export function PaintingJourney({
  projects,
}: {
  projects: readonly Project[];
}) {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useChapterHash(scope);
  useGardenPresence(scope, active);
  useChapterChoreography(scope, active);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const tracker = ScrollTrigger.create({
        trigger: scope.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setActive(getChapterIndex(self.progress));
          scope.current?.style.setProperty(
            "--journey-progress",
            String(self.progress),
          );
        },
      });
      setActive(getChapterIndex(tracker.progress));
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
            defaults: { ease: "none" },
          })
          .fromTo(
            '[data-scene="pond"]',
            { scale: 1.05 },
            { scale: 1.5, xPercent: -7, yPercent: 4, duration: 2.3 },
            0,
          )
          .fromTo(
            '[data-scene="bridge"]',
            { opacity: 0, scale: 1.02 },
            { opacity: 1, duration: 0.5 },
            1.65,
          )
          .to(
            '[data-scene="bridge"]',
            { scale: 1.3, xPercent: 4, duration: 2 },
            1.65,
          )
          .fromTo(
            '[data-scene="lilies"]',
            { opacity: 0, scale: 1.02 },
            { opacity: 1, duration: 0.6 },
            3.5,
          )
          .to('[data-scene="lilies"]', { scale: 1.18, duration: 1.5 }, 3.5)
          .fromTo(
            "[data-foreground]",
            { scale: 1.05, xPercent: 0, yPercent: 0 },
            { scale: 1.8, xPercent: 18, yPercent: -18, duration: 2.3 },
            0,
          )
          .to("[data-foreground]", { opacity: 0, duration: 0.5 }, 1.7);
      });
      return () => media.revert();
    },
    { scope },
  );
  const navigate = (index: number) => {
    const section = scope.current;
    if (!section) return;
    const top =
      section.offsetTop +
      getChapterScrollTop(index, section.offsetHeight, window.innerHeight);
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={scope}
      className="painting-journey"
      aria-label="A journey through Riska Amelia’s water garden"
    >
      <Link className="journey-skip" href="/projects">
        Skip the journey — view projects
      </Link>
      {CHAPTERS.map((chapter, index) => (
        <span
          id={chapter.id}
          key={chapter.id}
          className="journey-anchor"
          style={{ top: `${index * 110}svh` }}
          aria-hidden="true"
        />
      ))}
      <div className="painting-stage" data-chapter={active}>
        <div className="painting-presence">
          <PaintingScenes active={active} />
        </div>
        <div className="journey-frame" aria-hidden="true" />
        <div className="journey-interface">
          <GardenTableaux active={active} />
          <PaintedPigments journey={scope} />
          <JourneyNavigation active={active} navigate={navigate} />
          <JourneyContent
            active={active}
            next={() => navigate(Math.min(4, active + 1))}
          />
          {active === 2 ? <ProjectReflections projects={projects} /> : null}
          {active === 3 ? <GardenNotebook /> : null}
          <CatGuide active={active} navigate={navigate} />
        </div>
        <WaterRipples />
        <div className="journey-progress" aria-hidden="true" />
      </div>
      <noscript>
        <section className="journey-noscript">
          <h2>Meet Riska Amelia</h2>
          <p>
            Software engineer working with React, Next.js, and TypeScript.
            Browse projects and writing, or say hello.
          </p>
          <Link href="/projects">Projects</Link>
          <Link href="/writing">Writing</Link>
          <a href={`mailto:${SITE.email}`}>Email Riska</a>
        </section>
      </noscript>
    </main>
  );
}
