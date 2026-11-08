import Link from "next/link";
import { ArrowUpRight, NotebookPen } from "lucide-react";
export function GardenNotebook() {
  return (
    <aside className="garden-notebook" aria-label="The open notebook">
      <NotebookPen size={22} strokeWidth={1} aria-hidden="true" />
      <span className="notebook-caption">A page left open</span>
      <p>
        For the things
        <br />
        still waiting
        <br />
        <em>to be discovered.</em>
      </p>
      <Link href="/writing">
        No published notes yet <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </aside>
  );
}
