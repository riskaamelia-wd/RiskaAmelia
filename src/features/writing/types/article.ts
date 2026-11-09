export interface Article {
  slug: string;
  title: string;
  date: string;
  summary: string;
  paragraphs: readonly string[];
  cover?: { src: string; alt: string; width: number; height: number };
  languages?: readonly ArticleLanguage[];
}
export type ArticleLanguage = "id" | "en";
