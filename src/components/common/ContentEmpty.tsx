import { FolderHeart, NotebookPen } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
const EMPTY_COPY = {
  projects: {
    title: "A little space for what’s next.",
    description:
      "My project collection is being put together. Real work, thoughtful details, and the stories behind them — coming soon.",
    icon: FolderHeart,
  },
  writing: {
    title: "The notebook is open.",
    description:
      "A home for notes on frontend development, things I’m learning, and ideas worth keeping. No posts just yet.",
    icon: NotebookPen,
  },
} as const;
export function ContentEmpty({ kind }: { kind: keyof typeof EMPTY_COPY }) {
  const { title, description, icon: Icon } = EMPTY_COPY[kind];
  return (
    <Empty className="min-h-72 rounded-none border-y border-solid bg-transparent px-6 py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
