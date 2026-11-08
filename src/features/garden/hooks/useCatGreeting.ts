import { createCatVoice } from "../lib/cat-voice";
import { useEffect, useRef, useState } from "react";
export function useCatGreeting() {
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const audio = useRef<ReturnType<typeof createCatVoice> | null>(null);
  const timer = useRef(0);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    const pause = () => {
      if (document.hidden) {
        audio.current?.pause();
        clearTimeout(timer.current);
        setSpeaking(false);
      }
    };
    document.addEventListener("visibilitychange", pause);
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
      audio.current?.pause();
      audio.current = null;
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);
  const greet = async () => {
    clearTimeout(timer.current);
    setSpeaking(true);
    timer.current = window.setTimeout(() => setSpeaking(false), 850);
    if (!voice) return;
    try {
      const sound = audio.current ?? createCatVoice();
      audio.current = sound;
      await sound.play();
    } catch {
      if (mounted.current) {
        setVoice(false);
        setUnavailable(true);
      }
    }
  };
  return {
    speaking,
    voice,
    unavailable,
    toggleVoice: () => {
      if (voice) audio.current?.pause();
      setVoice(!voice);
    },
    greet,
  };
}
