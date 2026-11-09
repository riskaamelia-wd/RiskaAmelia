import type { Article } from "./types/article";
// Publish only original, reviewed writing. Dates use ISO YYYY-MM-DD.
export const ARTICLES: readonly Article[] = [
  {
    slug: "the-almanack-of-naval-ravikant",
    title: "The Almanack of Naval Ravikant: Rich, Happy, and No Drama",
    date: "2026-11-09",
    summary:
      "Personal reading notes on wealth, leverage, specific knowledge, happiness, and learning what is enough. Available in English and Bahasa Indonesia.",
    paragraphs: [],
    languages: ["en", "id"],
    cover: {
      src: "/images/blog-naval.png",
      alt: "An open book and an empty chair beside a quiet impressionist water-lily pond in soft morning light.",
      width: 1672,
      height: 941,
    },
  },
  {
    slug: "bullmq-job-queues-nodejs",
    diagram: "queue",
    title: "BullMQ: Practical and Reliable Job Queues for Node.js",
    date: "2026-10-09",
    summary:
      "Learn queues, workers, retries, schedulers, and flows for moving heavy work into background jobs. Available in English and Bahasa Indonesia.",
    paragraphs: [],
    languages: ["en", "id"],
    cover: {
      src: "/images/blog-bullmq.png",
      alt: "An impressionist river garden with a silver bull and paper boats carrying golden parcels toward a workshop, illustrating a job queue.",
      width: 1672,
      height: 941,
    },
  },
];
export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticleStaticParams() {
  return ARTICLES.map((item) => ({ slug: item.slug }));
}
