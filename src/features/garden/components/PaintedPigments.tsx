"use client";
import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample the original painting: the transition uses its pigments, not confetti.
export function PaintedPigments({
  journey,
}: {
  journey: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const stage = canvas?.parentElement;
      const context = canvas?.getContext("2d");
      if (!canvas || !stage || !context) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        let disposed = false;
        let frame = 0;
        let progress = 0;
        let width = 0;
        let height = 0;
        let colors: Uint8ClampedArray | undefined;
        const columns = window.innerWidth < 768 ? 30 : 60;
        const rows = 30;
        const draw = () => {
          frame = 0;
          context.clearRect(0, 0, width, height);
          const distance = Math.abs(progress * 5 - Math.round(progress * 5));
          const energy =
            progress > 0.1 && progress < 0.98
              ? Math.max(0, 1 - distance / 0.24)
              : 0;
          if (!colors || !energy || document.hidden) return;
          context.globalAlpha = Math.sin((energy * Math.PI) / 2) * 0.8;
          for (let index = 0; index < columns * rows; index += 1) {
            const color = index * 4;
            const angle = index * 2.39996 + energy * 1.7;
            const spread = energy * (0.4 + (index % 17) / 17);
            const x =
              width * (0.28 + ((index % columns) / columns) * 0.65) +
              Math.cos(angle) * spread * width * 0.17;
            const y =
              height * (0.15 + (Math.floor(index / columns) / rows) * 0.65) +
              Math.sin(angle) * spread * height * 0.24;
            context.fillStyle = `rgb(${colors[color]} ${colors[color + 1]} ${colors[color + 2]})`;
            context.fillRect(x, y, 2 + (index % 5), 2 + (index % 3));
          }
        };
        const requestDraw = () => {
          if (!frame && !disposed && !document.hidden)
            frame = requestAnimationFrame(draw);
        };
        const resize = () => {
          width = stage.clientWidth;
          height = stage.clientHeight;
          const ratio = Math.min(window.devicePixelRatio, 1.5);
          canvas.width = Math.round(width * ratio);
          canvas.height = Math.round(height * ratio);
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          requestDraw();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(stage);
        const image = new window.Image();
        image.onload = () => {
          if (disposed) return;
          const sample = document.createElement("canvas");
          sample.width = columns;
          sample.height = rows;
          const palette = sample.getContext("2d", { willReadFrequently: true });
          if (!palette) return;
          palette.drawImage(image, 0, 0, columns, rows);
          colors = palette.getImageData(0, 0, columns, rows).data;
          canvas.dataset.ready = "true";
          requestDraw();
        };
        image.src = "/images/water-lily-pond.webp";
        const tracker = ScrollTrigger.create({
          trigger: journey.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            progress = self.progress;
            requestDraw();
          },
        });
        progress = tracker.progress;
        const visibility = () => {
          cancelAnimationFrame(frame);
          frame = 0;
          if (document.hidden) context.clearRect(0, 0, width, height);
          else requestDraw();
        };
        document.addEventListener("visibilitychange", visibility);
        resize();
        return () => {
          disposed = true;
          cancelAnimationFrame(frame);
          observer.disconnect();
          tracker.kill();
          image.onload = null;
          document.removeEventListener("visibilitychange", visibility);
          context.clearRect(0, 0, width, height);
          delete canvas.dataset.ready;
        };
      });
      return () => media.revert();
    },
    { scope: journey },
  );
  return (
    <canvas ref={canvasRef} className="painted-pigments" aria-hidden="true" />
  );
}
