import { PaintedCat } from "@/components/common/PaintedCat";
import { CHAPTERS } from "../chapters";
export function CatGuide({
  active,
  navigate,
}: {
  active: number;
  navigate: (index: number) => void;
}) {
  const next = active === 4 ? 0 : active + 1;
  return (
    <button
      type="button"
      className="cat-guide"
      data-chapter={active}
      onClick={() => navigate(next)}
      aria-label={`Follow the cat to ${CHAPTERS[next].label}`}
    >
      <span className="cat-guide-whisper">
        {active === 4 ? "Shall we wander again?" : "There’s more this way…"}
      </span>
      <PaintedCat className="cat-guide-portrait" />
      <span className="cat-guide-invitation">Follow me</span>
    </button>
  );
}
