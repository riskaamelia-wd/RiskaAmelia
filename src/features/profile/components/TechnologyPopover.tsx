"use client";
import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { TechnologyEntry } from "../types/technology";
export function TechnologyPopover({
  technology,
  open,
  onOpenChange,
}: {
  technology: TechnologyEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const restoreFocus = useRef(false);
  const ignoreFocus = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  const cancelClose = () => clearTimeout(timer.current);
  const closeSoon = () => {
    cancelClose();
    timer.current = window.setTimeout(() => {
      if (
        document.activeElement !== trigger.current &&
        !content.current?.contains(document.activeElement)
      )
        onOpenChange(false);
    }, 160);
  };
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          ref={trigger}
          type="button"
          data-technology-trigger
          aria-label={`Learn about ${technology.name}`}
          onPointerEnter={(event) => {
            cancelClose();
            if (
              event.pointerType === "mouse" &&
              window.matchMedia("(hover: hover)").matches
            )
              onOpenChange(true);
          }}
          onPointerLeave={closeSoon}
          onFocus={(event) => {
            if (
              !ignoreFocus.current &&
              event.currentTarget.matches(":focus-visible")
            )
              onOpenChange(true);
          }}
          onBlur={closeSoon}
          onClick={(event) => {
            event.preventDefault();
            cancelClose();
            const toggle =
              event.detail === 0 ||
              !window.matchMedia("(hover: hover)").matches;
            onOpenChange(toggle ? !open : true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Tab" && !event.shiftKey && open) {
              const firstLink =
                content.current?.querySelector<HTMLAnchorElement>("a");
              if (firstLink) {
                event.preventDefault();
                firstLink.focus();
              }
            }
          }}
        >
          <span aria-hidden="true">/</span>
          {technology.name}
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        ref={content}
        className="technology-popout"
        collisionPadding={16}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-definition`}
        onPointerEnter={cancelClose}
        onPointerLeave={closeSoon}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onEscapeKeyDown={() => {
          restoreFocus.current = true;
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (restoreFocus.current) {
            restoreFocus.current = false;
            ignoreFocus.current = true;
            requestAnimationFrame(() => {
              const active = document.activeElement;
              if (
                active === document.body ||
                active === trigger.current ||
                content.current?.contains(active)
              )
                trigger.current?.focus({ preventScroll: true });
              ignoreFocus.current = false;
            });
          }
        }}
      >
        <button
          type="button"
          className="technology-popout-close"
          aria-label="Close technology explanation"
          onClick={() => {
            restoreFocus.current = true;
            onOpenChange(false);
          }}
        >
          <X size={16} aria-hidden="true" />
        </button>
        <div className="technology-popout-heading">
          <h3 id={`${id}-title`}>{technology.name}</h3>
          <span>{technology.category}</span>
        </div>
        <p id={`${id}-definition`} className="technology-definition">
          {technology.definition}
        </p>
        <p className="technology-purpose">{technology.purpose}</p>
        {technology.projects.length ? (
          <div className="technology-projects">
            <span>In my work</span>
            <ul>
              {technology.projects.map((project) => (
                <li key={project.href}>
                  <Link href={project.href}>
                    {project.title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <a href={technology.documentation} className="technology-documentation">
          Official documentation <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </PopoverContent>
    </Popover>
  );
}
