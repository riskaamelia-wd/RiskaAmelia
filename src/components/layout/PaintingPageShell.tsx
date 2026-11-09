"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation enables cross-document painting transitions. */
import Image from "next/image";
import { createContext, useContext, useRef } from "react";
import { usePaintingPageMotion } from "@/hooks/usePaintingPageMotion";
import { usePaintingFrame } from "@/hooks/usePaintingFrame";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowUp } from "lucide-react";
import { PaintedCat } from "@/components/common/PaintedCat";
import "@/styles/garden.css";
import "@/styles/painting-pages.css";
const LINKS = [
  { href: "/", label: "The pond" },
  { href: "/about", label: "The person" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/#contact", label: "A conversation" },
];
const PaintingShellContext = createContext(false);
export function PaintingPageShell({ children }: { children: React.ReactNode }) {
  const insidePainting = useContext(PaintingShellContext);
  if (insidePainting) return children;
  return (
    <PaintingShellContext value={true}>
      <PaintingPageSurface>{children}</PaintingPageSurface>
    </PaintingShellContext>
  );
}
function PaintingPageSurface({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);
  usePaintingPageMotion(scope, pathname);
  usePaintingFrame(scope, pathname);
  const writing = pathname.startsWith("/writing");
  const about = pathname.startsWith("/about");
  const chapter = writing ? "writing" : about ? "about" : "projects";
  return (
    <div ref={scope} className="painting-page">
      <div className="painting-page-progress" aria-hidden="true" />
      <div className="painting-page-art" aria-hidden="true">
        <div className="painting-page-depth">
          <div className="painting-page-scene">
            <Image
              src="/images/garden-bridge.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="painting-shade" />
          </div>
        </div>
      </div>
      <div className="painting-page-frame" aria-hidden="true" />
      <a href="#main-content" className="journey-skip">
        Skip to content
      </a>
      <header className="painting-page-header">
        <a href="/" className="journey-wordmark" aria-label="Riska Amelia home">
          Riska Amelia<span>.</span>
        </a>
        <p className="journey-header-note">
          {writing
            ? "Notes from the garden"
            : about
              ? "The person behind the painting"
              : "Creations along the way"}
        </p>
        <a href={`/#${chapter}`} className="journey-connect">
          <ArrowLeft size={16} aria-hidden="true" /> Back to the painting
        </a>
      </header>
      <nav
        aria-label="Main navigation"
        className="journey-index painting-page-index"
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="journey-index-item"
            aria-current={
              link.href !== "/" && pathname.startsWith(link.href)
                ? "page"
                : undefined
            }
          >
            <span className="journey-index-line" />
            <span className="journey-index-label">{link.label}</span>
          </a>
        ))}
      </nav>
      <main id="main-content" tabIndex={-1} className="painting-page-main">
        {children}
      </main>
      <button
        type="button"
        className="painting-page-top"
        aria-label="Return to the top of this page"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
          scope.current
            ?.querySelector<HTMLElement>("#main-content")
            ?.focus({ preventScroll: true });
        }}
      >
        <ArrowUp size={16} aria-hidden="true" /> <span>Back to top</span>
      </button>
      <footer className="painting-page-footer">
        <span className="journey-chapter-count">
          {writing ? "04" : about ? "02" : "03"}
          <span className="journey-count-rule" />
          05
        </span>
        <span className="journey-footer-note">
          Still a part of the painting.
        </span>
        <a href={`/#${chapter}`} className="journey-connect">
          Continue wandering <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </footer>
      <a
        className="painting-page-cat"
        href={writing ? "/#contact" : about ? "/projects" : "/writing"}
        aria-label={`Follow the cat to ${writing ? "a conversation" : about ? "projects" : "writing"}`}
      >
        <PaintedCat />
        <span>Follow me</span>
      </a>
    </div>
  );
}
