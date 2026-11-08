import type { Metadata } from "next";
import { CollectionPage } from "@/components/common/CollectionPage";
import { WritingList } from "@/features/writing/components/WritingList";
export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on frontend development, curiosity, and learning along the way.",
};
export default function Page() {
  return (
    <CollectionPage
      title="Notes along the way."
      description="Things I’m learning, questions I’m exploring, and thoughts from behind the screen."
    >
      <WritingList />
    </CollectionPage>
  );
}
