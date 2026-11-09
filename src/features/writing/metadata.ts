import type { Metadata } from "next";
import { getArticle } from "./content";
export function getArticleMetadata(slug: string): Metadata {
  const article = getArticle(slug);
  return article
    ? {
        title: article.title,
        description: article.summary,
        openGraph: {
          title: article.title,
          description: article.summary,
          type: "article",
          publishedTime: article.date,
          images: article.cover
            ? [
                {
                  url: article.cover.src,
                  width: article.cover.width,
                  height: article.cover.height,
                  alt: article.cover.alt,
                },
              ]
            : undefined,
        },
      }
    : { title: "Article not found", robots: { index: false } };
}
