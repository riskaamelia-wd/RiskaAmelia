import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function useChapterChoreography(
  scope: RefObject<HTMLElement | null>,
  active: number,
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const range = () => Math.max(0, root.offsetHeight - window.innerHeight);
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => root.offsetTop + (range() * active) / 5,
            end: () => root.offsetTop + (range() * (active + 1)) / 5,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
        if (active === 0) {
          timeline.fromTo(
            ".cat-guide",
            { rotationZ: -3, y: 18 },
            { rotationZ: 0, y: -10, duration: 1 },
          );
        }
        if (active === 1) {
          timeline
            .fromTo(
              ".garden-portrait .garden-tableau-canvas",
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.18 },
            )
            .fromTo(
              ".garden-portrait",
              { rotationZ: 4, y: 35 },
              { rotationZ: -2, y: -15, duration: 1 },
              0,
            )
            .fromTo(
              ".garden-portrait img",
              { scale: 1.18 },
              { scale: 1, duration: 1 },
              0,
            );
        }
        if (active === 2) {
          timeline
            .fromTo(
              ".reflection-artwork",
              { rotationY: -12, rotationZ: 2, scale: 0.9 },
              { rotationY: 0, rotationZ: 0, scale: 1, duration: 0.3 },
            )
            .to(".reflection-artwork", {
              rotationZ: -2,
              y: -10,
              duration: 0.7,
            });
        }
        if (active === 3) {
          timeline
            .fromTo(
              ".garden-notebook",
              { rotationY: -32, rotationZ: -5 },
              { rotationY: 0, rotationZ: 3, duration: 0.6 },
            )
            .to(".garden-notebook", {
              rotationZ: -1,
              rotationY: 8,
              duration: 0.4,
            });
        }
        if (active === 4) {
          timeline.fromTo(
            ".garden-lily-study",
            { rotationZ: -8, scale: 0.85, y: 35 },
            { rotationZ: 3, scale: 1.08, y: -15, duration: 1 },
          );
        }
      });
      return () => media.revert();
    },
    { scope, dependencies: [active], revertOnUpdate: true },
  );
}
