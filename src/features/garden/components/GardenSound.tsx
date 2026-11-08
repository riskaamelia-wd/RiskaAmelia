"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { createGardenAmbience } from "../lib/ambience";
export function GardenSound() {
  const audio = useRef<AudioContext | null>(null);
  const enabled = useRef(false);
  const mounted = useRef(true);
  const busy = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    mounted.current = true;
    const visibility = async () => {
      const context = audio.current;
      if (!context || context.state === "closed") return;
      try {
        if (document.hidden || !enabled.current) await context.suspend();
        else await context.resume();
      } catch {
        enabled.current = false;
        if (mounted.current) {
          setPlaying(false);
          setUnavailable(true);
        }
      }
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      mounted.current = false;
      enabled.current = false;
      document.removeEventListener("visibilitychange", visibility);
      const context = audio.current;
      audio.current = null;
      if (context && context.state !== "closed")
        void context.close().catch(() => {});
    };
  }, []);
  const toggle = async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      const context = audio.current ?? createGardenAmbience();
      audio.current = context;
      const shouldPlay = !enabled.current;
      if (shouldPlay && !document.hidden) await context.resume();
      else await context.suspend();
      if (!mounted.current) return;
      enabled.current = shouldPlay;
      setPlaying(shouldPlay);
    } catch {
      if (mounted.current) {
        setUnavailable(true);
        setPlaying(false);
      }
    } finally {
      busy.current = false;
    }
  };
  return (
    <div className="garden-sound-control">
      <button
        className="garden-sound"
        type="button"
        aria-label="Garden sound"
        aria-pressed={playing}
        onClick={toggle}
        disabled={unavailable}
        title="Optional softly synthesized breeze"
      >
        {playing ? (
          <Volume2 size={15} aria-hidden="true" />
        ) : (
          <VolumeX size={15} aria-hidden="true" />
        )}
        <span>
          {unavailable
            ? "Sound unavailable"
            : playing
              ? "Garden sound on"
              : "Garden sound off"}
        </span>
      </button>
      {unavailable ? (
        <span className="sr-only" role="status">
          Garden sound is unavailable in this browser.
        </span>
      ) : null}
    </div>
  );
}
