import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle } from "../content";
export function ArticleDetail({ slug }: { slug: string }) {
  const article = getArticle(slug);
  if (!article) notFound();
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
