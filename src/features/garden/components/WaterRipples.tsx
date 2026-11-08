"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
gsap.registerPlugin(useGSAP);
export function WaterRipples() {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const element = scope.current;
        const stage = element?.closest(".painting-stage");
        if (!element || !stage) return;
        const rings = element.querySelectorAll<HTMLElement>(".water-ripple");
        let next = 0;
        const ripple = (event: Event) => {
          if (
            !(event instanceof PointerEvent) ||
            !(event.target instanceof Element)
          )
            return;
          if (
            event.target.closest(
              "a, button, nav, .journey-content, .project-reflections",
            )
          )
            return;
          const ring = rings[next % rings.length];
          next += 1;
          if (!ring) return;
          const bounds = element.getBoundingClientRect();
          gsap.fromTo(
            ring,
            {
              x: event.clientX - bounds.left - 55,
              y: event.clientY - bounds.top - 20,
              scale: 0.12,
              opacity: 0.65,
            },
            {
              scale: 2.3,
              opacity: 0,
              duration: 1.9,
              ease: "power2.out",
              overwrite: true,
            },
          );
        };
        stage.addEventListener("pointerdown", ripple, { passive: true });
        return () => {
          stage.removeEventListener("pointerdown", ripple);
          gsap.killTweensOf(rings);
        };
      });
      return () => media.revert();
    },
    { scope },
  );
  return (
    <div ref={scope} className="water-ripples" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <span key={index} className="water-ripple" />
      ))}
    </div>
  );
}
