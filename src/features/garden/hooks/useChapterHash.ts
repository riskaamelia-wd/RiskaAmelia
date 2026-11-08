import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "../chapters";
import { getChapterScrollTop } from "../utils/chapter-progress";

// Native cross-document transitions can restore scroll after GSAP initializes.
// Resolve a fragment against the journey's actual scroll range once layout settles.
export function useChapterHash(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    const restore = () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      const index = CHAPTERS.findIndex(
        (chapter) => `#${chapter.id}` === window.location.hash,
      );
      if (index < 0) return;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          const root = scope.current;
          if (!root) return;
          window.scrollTo({
            top:
              root.offsetTop +
              getChapterScrollTop(index, root.offsetHeight, window.innerHeight),
            behavior: "instant",
          });
          ScrollTrigger.update();
        });
      });
    };
    restore();
    window.addEventListener("hashchange", restore);
    window.addEventListener("pageshow", restore);
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("pageshow", restore);
    };
  }, [scope]);
}
