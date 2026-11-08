import { Volume2, VolumeX } from "lucide-react";
import { PaintedCat } from "@/components/common/PaintedCat";
import { useCatGreeting } from "../hooks/useCatGreeting";
import { CHAPTERS } from "../chapters";
export function CatGuide({
  active,
  navigate,
}: {
  active: number;
  navigate: (index: number) => void;
}) {
  const next = active === 4 ? 0 : active + 1;
  const greeting = useCatGreeting();
  return (
    <>
      <div className="cat-guide" data-chapter={active}>
        <button
          type="button"
          className="cat-guide-action"
          onClick={() => {
            void greeting.greet();
            navigate(next);
          }}
          aria-label={`Follow the cat to ${CHAPTERS[next].label}`}
        >
          <span className="cat-guide-whisper">
            {greeting.speaking
              ? "Mrrp… this way!"
              : active === 0
                ? "Shall we explore?"
                : active === 4
                  ? "Shall we wander again?"
                  : "There’s more this way…"}
          </span>
          <PaintedCat
            className="cat-guide-portrait"
            expression={greeting.speaking ? "meow" : "awake"}
          />
          <span className="cat-guide-invitation">Follow me</span>
        </button>
      </div>
      <button
        type="button"
        className="cat-voice-toggle"
        aria-label="Cat voice"
        aria-pressed={greeting.voice}
        disabled={greeting.unavailable}
        onClick={greeting.toggleVoice}
      >
        {greeting.voice ? (
          <Volume2 size={12} aria-hidden="true" />
        ) : (
          <VolumeX size={12} aria-hidden="true" />
        )}
        <span>
          {greeting.unavailable
            ? "Voice unavailable"
            : greeting.voice
              ? "Voice on"
              : "Voice off"}
        </span>
      </button>
      {greeting.unavailable ? (
        <span className="sr-only" role="status">
          Cat voice is unavailable. You can still follow the cat.
        </span>
      ) : null}
    </>
  );
}
