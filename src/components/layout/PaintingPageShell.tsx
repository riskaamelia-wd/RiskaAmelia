"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
export function PaintingPageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const writing = pathname.startsWith("/writing");
  const about = pathname.startsWith("/about");
  const chapter = writing ? "writing" : about ? "about" : "projects";
  return (
    <div className="painting-page">
      <div className="painting-page-art" aria-hidden="true">
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
      <div className="painting-page-frame" aria-hidden="true" />
      <a href="#main-content" className="journey-skip">
        Skip to content
      </a>
      <header className="painting-page-header">
        <Link
          href="/"
          className="journey-wordmark"
          aria-label="Riska Amelia home"
        >
          Riska Amelia<span>.</span>
        </Link>
        <p className="journey-header-note">
          {writing
            ? "Notes from the garden"
            : about
              ? "The person behind the painting"
              : "Creations along the way"}
        </p>
        <Link href={`/#${chapter}`} className="journey-connect">
          <ArrowLeft size={16} aria-hidden="true" /> Back to the painting
        </Link>
      </header>
      <nav
        aria-label="Main navigation"
        className="journey-index painting-page-index"
      >
        {LINKS.map((link) => (
          <Link
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
          </Link>
        ))}
      </nav>
      <main id="main-content" tabIndex={-1} className="painting-page-main">
        {children}
      </main>
      <footer className="painting-page-footer">
        <span className="journey-chapter-count">
          {writing ? "04" : about ? "02" : "03"}
          <span className="journey-count-rule" />
          05
        </span>
        <span className="journey-footer-note">
          Still a part of the painting.
        </span>
        <Link href={`/#${chapter}`} className="journey-connect">
          Continue wandering <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </footer>
      <div className="painting-page-cat" aria-hidden="true">
        <PaintedCat />
      </div>
    </div>
  );
}
