import Link from "next/link";
import { ARTICLES } from "@/features/writing/content";
import { ArrowUpRight, NotebookPen } from "lucide-react";
export function GardenNotebook() {
  const latest = ARTICLES[0];
  return (
    <aside className="garden-notebook" aria-label="The open notebook">
      <NotebookPen size={22} strokeWidth={1} aria-hidden="true" />
      <span className="notebook-caption">A page left open</span>
      <p>
        {latest ? (
          <>
            Background jobs,
            <br />
            <em>a little clearer.</em>
          </>
        ) : (
          <>
            For the things
            <br />
            still waiting
            <br />
            <em>to be discovered.</em>
          </>
        )}
      </p>
      <Link href={latest ? `/writing/${latest.slug}` : "/writing"}>
        {latest ? "Read about BullMQ · ID / EN" : "No published notes yet"}{" "}
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </aside>
  );
}
