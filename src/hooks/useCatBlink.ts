import { useEffect, useState, type RefObject } from "react";

export function useCatBlink(image: RefObject<HTMLImageElement | null>) {
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let blinkTimer = 0;
    let reopenTimer = 0;
    const stop = () => {
      clearTimeout(blinkTimer);
      clearTimeout(reopenTimer);
      setBlinking(false);
    };
    const schedule = () => {
      stop();
      if (!visible || motion.matches || document.hidden) return;
      blinkTimer = window.setTimeout(() => {
        setBlinking(true);
        reopenTimer = window.setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 180);
      }, 4600);
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      schedule();
    });
    if (image.current) observer.observe(image.current);
    motion.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(reopenTimer);
      observer.disconnect();
      motion.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [image]);
  return blinking;
}
