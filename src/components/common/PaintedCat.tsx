"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCatBlink } from "@/hooks/useCatBlink";
export function PaintedCat({
  className,
  expression = "awake",
}: {
  className?: string;
  expression?: "awake" | "meow";
}) {
  const image = useRef<HTMLImageElement>(null);
  const blinking = useCatBlink(image);
  const [ready, setReady] = useState({ blink: false, meow: false });
  const frame =
    expression === "meow" && ready.meow
      ? "meow"
      : blinking && ready.blink
        ? "blink"
        : "awake";
  useEffect(() => {
    let mounted = true;
    const preloads = (["blink", "meow"] as const).map((state) => {
      const preload = new window.Image();
      preload.onload = async () => {
        try {
          await preload.decode();
          if (mounted) setReady((previous) => ({ ...previous, [state]: true }));
        } catch {
          // Keep the awake expression if an optional frame cannot be decoded.
        }
      };
      preload.src = `/images/monet-cat-${state}.webp`;
      return preload;
    });
    return () => {
      mounted = false;
      preloads.forEach((preload) => {
        preload.onload = null;
      });
    };
  }, []);
  return (
    <Image
      ref={image}
      src={`/images/monet-cat-${frame}.webp`}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      sizes="(max-width: 767px) 150px, 330px"
      decoding="sync"
      loading="eager"
      unoptimized
      className={className}
      data-expression={frame}
    />
  );
}
