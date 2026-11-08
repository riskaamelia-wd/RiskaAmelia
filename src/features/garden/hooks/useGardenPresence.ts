import { usePaintingDepth } from "@/hooks/usePaintingDepth";
import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function useGardenPresence(
  scope: RefObject<HTMLElement | null>,
  active: number,
) {
  usePaintingDepth(scope, ".painting-presence", ".painting-stage");
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".painting-presence",
          { clipPath: "inset(7% 5%)" },
          {
            clipPath: "inset(0% 0%)",
            duration: 1.25,
            ease: "power3.out",
          },
        );
      });
      return () => media.revert();
    },
    { scope },
  );

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".journey-content",
          { autoAlpha: 0.5, x: -14 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
          },
        );
      });
      return () => media.revert();
    },
    { scope, dependencies: [active], revertOnUpdate: true },
  );
}
