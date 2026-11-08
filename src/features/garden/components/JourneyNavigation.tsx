import { ArrowDown, ArrowUp, Flower2 } from "lucide-react";
import { GardenSound } from "./GardenSound";
import { CHAPTERS } from "../chapters";
export function JourneyNavigation({
  active,
  navigate,
}: {
  active: number;
  navigate: (index: number) => void;
}) {
  return (
    <>
      <header className="journey-header">
        <a
          href="#arrival"
          className="journey-wordmark"
          onClick={(event) => {
            event.preventDefault();
            navigate(0);
          }}
        >
          Riska Amelia<span>.</span>
        </a>
        <div className="journey-header-center">
          <p className="journey-header-note">
            A software engineer’s little garden
          </p>
          <GardenSound />
        </div>
        <a
          className="journey-connect"
          aria-label="Let’s connect"
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            navigate(4);
          }}
        >
          <span>Let’s connect</span>{" "}
          <Flower2 size={17} strokeWidth={1} aria-hidden="true" />
        </a>
      </header>
      <nav aria-label="Explore the painting" className="journey-index">
        {CHAPTERS.map((chapter, index) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            onClick={(event) => {
              event.preventDefault();
              navigate(index);
            }}
            aria-current={active === index ? "step" : undefined}
            className="journey-index-item"
          >
            <span className="journey-index-line" />
            <span className="journey-index-label">{chapter.label}</span>
          </a>
        ))}
      </nav>
      <footer className="journey-footer">
        <div className="journey-chapter-count">
          <span>{CHAPTERS[active].number}</span>
          <span className="journey-count-rule" />
          <span>05</span>
        </div>
        <span className="journey-footer-note">
          {active === 0
            ? "Touch the water. Follow your curiosity."
            : "An original world, inspired by impressionism."}
        </span>
        <button
          className="journey-next"
          onClick={() => navigate(active === 4 ? 0 : active + 1)}
          aria-label={
            active === 4
              ? "Return to the pond"
              : `Continue to ${CHAPTERS[active + 1].label}`
          }
        >
          {active === 4 ? (
            <ArrowUp size={18} aria-hidden="true" />
          ) : (
            <ArrowDown size={18} aria-hidden="true" />
          )}
        </button>
      </footer>
    </>
  );
}
