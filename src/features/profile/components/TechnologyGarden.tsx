"use client";
import { useState, type KeyboardEvent } from "react";
import { TechnologyPopover } from "./TechnologyPopover";
import type { TechnologyEntry } from "../types/technology";
import "@/styles/technology-garden.css";
export function TechnologyGarden({
  technologies,
}: {
  technologies: readonly TechnologyEntry[];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = (event: KeyboardEvent<HTMLUListElement>) => {
    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        "[data-technology-trigger]",
      ),
    );
    const current = buttons.findIndex(
      (button) => button === document.activeElement,
    );
    if (current < 0) return;
    const offsets: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 2,
      ArrowLeft: -1,
      ArrowUp: -2,
    };
    let next = current;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else if (event.key in offsets)
      next = (current + offsets[event.key] + buttons.length) % buttons.length;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons[next]?.focus({ preventScroll: true });
    buttons[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };
  return (
    <section
      className="technology-garden"
      aria-labelledby="technology-garden-title"
    >
      <h2 id="technology-garden-title">Tools behind the work.</h2>
      <p className="technology-intro">
        A few names you’ll find in my projects. Hover or choose one to see what
        it does.
      </p>
      <ul
        className="technology-list"
        aria-label="Explore technologies"
        onKeyDown={navigate}
      >
        {technologies.map((technology, index) => (
          <li key={technology.name}>
            <TechnologyPopover
              technology={technology}
              open={selected === index}
              onOpenChange={(open) =>
                setSelected((current) =>
                  open ? index : current === index ? null : current,
                )
              }
            />
          </li>
        ))}
      </ul>
      <noscript>
        <dl className="technology-static">
          {technologies.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd>
                {item.definition} <a href={item.documentation}>Documentation</a>
              </dd>
            </div>
          ))}
        </dl>
      </noscript>
    </section>
  );
}
