import Markdown from "react-markdown";
import type { ReactNode } from "react";
import type { ArticleLanguage } from "../types/article";
export function ArticleBody({
  title,
  markdown,
  language,
  date,
  children,
}: {
  title: string;
  markdown: string;
  language: ArticleLanguage;
  date: string;
  children?: ReactNode;
}) {
  return (
    <>
      <h1 className="section-heading article-title">{title}</h1>
      <p className="article-byline">
        Riska Amelia <span aria-hidden="true">·</span>{" "}
        <time dateTime={date}>
          {new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          }).format(new Date(`${date}T00:00:00Z`))}
        </time>
      </p>
      {children}
      <div className="article-prose">
        <Markdown
          skipHtml
          components={{
            pre: ({ children }) => (
              <pre
                tabIndex={0}
                role="region"
                aria-label={language === "id" ? "Contoh kode" : "Code example"}
              >
                {children}
              </pre>
            ),
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </>
  );
}
