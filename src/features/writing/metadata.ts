import type { Metadata } from "next";
import { getArticle } from "./content";
export function getArticleMetadata(slug: string): Metadata {
  const article = getArticle(slug);
  return article
    ? { title: article.title, description: article.summary }
    : { title: "Article not found", robots: { index: false } };
}
