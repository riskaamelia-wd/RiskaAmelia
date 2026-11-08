import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePaintingDepth } from "./usePaintingDepth";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePaintingPageMotion(
  scope: RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  usePaintingDepth(scope, ".painting-page-depth", ".painting-page");
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const progress = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          root.style.setProperty("--reading-progress", String(self.progress));
          root.dataset.reading = String(self.progress > 0.12);
        },
      });
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".painting-page-main",
          { y: 12, opacity: 0.7 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        );
        gsap.to(".painting-page-scene", {
          yPercent: -3,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1 },
        });
        const paintings = root.querySelectorAll(".project-painting-frame");
        paintings.forEach((painting, index) => {
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: painting,
                start: "top 95%",
                end: "bottom 5%",
                scrub: 0.65,
              },
            })
            .fromTo(
              painting,
              { rotationZ: index % 2 ? 3 : -3, scale: 0.92, y: 26 },
              { rotationZ: 0, scale: 1, y: 0, duration: 0.3 },
            )
            .to(painting, { rotationZ: 0, duration: 0.4 })
            .to(painting, {
              rotationZ: index % 2 ? -1.5 : 1.5,
              y: -18,
              duration: 0.3,
            });
        });
        gsap.fromTo(
          ".project-detail-artwork > div",
          { rotationY: -10, rotationZ: 2 },
          {
            rotationY: 0,
            rotationZ: -2,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: () => window.innerHeight,
              scrub: 0.65,
            },
          },
        );
        // Reading stays still: only the discussion rules draw as a section arrives.
        const sections = root.querySelectorAll(
          ".project-discussion-section, .painting-page-main article > section",
        );
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { "--section-rule": 0 },
            {
              "--section-rule": 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 95%",
                end: "top 55%",
                scrub: 0.65,
              },
            },
          );
        });
      });
      return () => {
        progress.kill();
        media.revert();
        root.style.removeProperty("--reading-progress");
        delete root.dataset.reading;
      };
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );
}
