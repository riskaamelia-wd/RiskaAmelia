import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "../content";
import { ContentEmpty } from "@/components/common/ContentEmpty";
export function WritingList() {
  if (!ARTICLES.length) return <ContentEmpty kind="writing" />;
  return (
    <div className="flex flex-col divide-y">
      {ARTICLES.map((article) => (
        <article key={article.slug} className="py-8">
          <time
            dateTime={article.date}
            className="text-sm text-muted-foreground"
          >
            {article.date}
          </time>
          <h2 className="mt-3 text-2xl font-bold">
            <Link href={`/writing/${article.slug}`} className="text-link">
              {article.title}
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            {article.summary}
          </p>
        </article>
      ))}
    </div>
  );
}
