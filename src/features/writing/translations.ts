import bullmq from "./articles/bullmq.json";
import naval from "./articles/naval-almanack.json";
import type { ArticleLanguage } from "./types/article";
interface ArticleTranslation {
  title: string;
  markdown: string;
}
const TRANSLATIONS: Readonly<
  Record<
    string,
    Readonly<Record<ArticleLanguage, ArticleTranslation>> | undefined
  >
> = {
  "bullmq-job-queues-nodejs": bullmq,
  "the-almanack-of-naval-ravikant": naval,
};
export function getArticleTranslations(slug: string) {
  return TRANSLATIONS[slug];
}
