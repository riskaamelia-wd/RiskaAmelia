export interface Article {
  slug: string;
  title: string;
  date: string;
  summary: string;
  paragraphs: readonly string[];
}
