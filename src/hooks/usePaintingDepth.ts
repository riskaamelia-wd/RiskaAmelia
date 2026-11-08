import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
gsap.registerPlugin(useGSAP);

export function usePaintingDepth(
  scope: RefObject<HTMLElement | null>,
  target: string,
  surface: string,
) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const element =
            scope.current?.querySelector<HTMLElement>(surface) ?? scope.current;
          if (!element) return;
          const x = gsap.quickTo(target, "x", {
            duration: 1.1,
            ease: "power3.out",
          });
          const y = gsap.quickTo(target, "y", {
            duration: 1.1,
            ease: "power3.out",
          });
          const reset = () => {
            x(0);
            y(0);
          };
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || document.hidden) return;
            x((event.clientX / window.innerWidth - 0.5) * -14);
            y((event.clientY / window.innerHeight - 0.5) * -10);
          };
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", reset);
          document.addEventListener("visibilitychange", reset);
          return () => {
            element.removeEventListener("pointermove", move);
            element.removeEventListener("pointerleave", reset);
            document.removeEventListener("visibilitychange", reset);
          };
        },
      );
      return () => media.revert();
    },
    { scope },
  );
}
