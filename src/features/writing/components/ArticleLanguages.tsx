"use client";
import { useState, type ReactNode } from "react";
import type { ArticleLanguage } from "../types/article";
export function ArticleLanguages({
  indonesian,
  english,
}: {
  indonesian: ReactNode;
  english: ReactNode;
}) {
  const [language, setLanguage] = useState<ArticleLanguage>("en");
  return (
    <>
      <div
        className="article-language-switch"
        role="group"
        aria-label="Article language"
      >
        <button
          type="button"
          lang="en"
          aria-pressed={language === "en"}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          type="button"
          lang="id"
          aria-pressed={language === "id"}
          onClick={() => setLanguage("id")}
        >
          Bahasa Indonesia
        </button>
      </div>
      <div lang="en" data-language-panel data-active={language === "en"}>
        {english}
      </div>
      <div lang="id" data-language-panel data-active={language === "id"}>
        {indonesian}
      </div>
      <noscript>
        <style>{`[data-language-panel] { display: block !important; margin-top: 80px; } .article-language-switch { display: none; }`}</style>
      </noscript>
    </>
  );
}
