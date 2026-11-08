import type { Article } from "./types/article";
// Publish only original, reviewed writing. Dates use ISO YYYY-MM-DD.
export const ARTICLES: readonly Article[] = [];
export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticleStaticParams() {
  return ARTICLES.map((item) => ({ slug: item.slug }));
}
