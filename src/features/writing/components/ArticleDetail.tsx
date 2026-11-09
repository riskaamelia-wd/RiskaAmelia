import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle } from "../content";
import { ContentImage } from "@/components/common/ContentImage";
import { ArticleLanguages } from "./ArticleLanguages";
import { ArticleBody } from "./ArticleBody";
import bullmq from "../articles/bullmq.json";
import "@/styles/articles.css";
export function ArticleDetail({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) notFound();
  if (article.slug === "bullmq-job-queues-nodejs") {
    return (
      <article className="page-shell article-reader py-16">
        <Link href="/writing" className="text-link mb-10">
          <ArrowLeft aria-hidden="true" className="size-4" /> All writing
        </Link>
        {article.cover ? (
          <div className="article-cover">
            <ContentImage
              {...article.cover}
              sizes="(max-width: 767px) 88vw, 760px"
              priority
            />
          </div>
        ) : null}
        <ArticleLanguages
          indonesian={
            <ArticleBody {...bullmq.id} language="id" date={article.date} />
          }
          english={
            <ArticleBody {...bullmq.en} language="en" date={article.date} />
          }
        />
      </article>
    );
  }
  return (
    <article className="page-shell py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/writing" className="text-link mb-10">
          <ArrowLeft aria-hidden="true" className="size-4" /> All writing
        </Link>
        <h1 className="section-heading">{article.title}</h1>
        <time
          dateTime={article.date}
          className="my-6 block text-sm text-muted-foreground"
        >
          {article.date}
        </time>
        <p className="mb-10 text-xl leading-8">{article.summary}</p>
        <div className="flex flex-col gap-6">
          {article.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="whitespace-pre-line leading-8 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
