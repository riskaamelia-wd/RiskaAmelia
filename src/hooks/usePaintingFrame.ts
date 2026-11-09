import { useEffect, type RefObject } from "react";
// Clip to the fixed painting frame while preserving native document scrolling.
export function usePaintingFrame(
  scope: RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  useEffect(() => {
    const root = scope.current;
    const frame = root?.querySelector<HTMLElement>(".painting-page-frame");
    if (!root || !frame) return;
    const surfaces = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".painting-page-header, .painting-page-index, .painting-page-main, .painting-page-footer",
      ),
    );
    let pending = 0;
    const update = () => {
      pending = 0;
      const boundary = frame.getBoundingClientRect();
      // Measure all surfaces first, then write; no layout reads after a style mutation.
      const clips = surfaces.map((surface) => {
        const rect = surface.getBoundingClientRect();
        // Negative insets preserve focus rings and children beyond the surface's own box.
        const top = boundary.top - rect.top;
        const bottom = rect.bottom - boundary.bottom;
        const left = boundary.left - rect.left;
        const right = rect.right - boundary.right;
        return `inset(${top}px ${right}px ${bottom}px ${left}px)`;
      });
      surfaces.forEach((surface, index) => {
        surface.style.clipPath = clips[index];
      });
    };
    const schedule = () => {
      if (!pending && !document.hidden) pending = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    surfaces.forEach((surface) => observer.observe(surface));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(pending);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      surfaces.forEach((surface) => surface.style.removeProperty("clip-path"));
    };
  }, [scope, pathname]);
}
