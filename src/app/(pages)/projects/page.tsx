import type { Metadata } from "next";
import { CollectionPage } from "@/components/common/CollectionPage";
import { ProjectList } from "@/features/projects/components/ProjectList";
export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of frontend projects and the stories behind them.",
};
export default function Page() {
  return (
    <CollectionPage
      title="Ideas, made real."
      description="A home for the websites I build and the little details that make them feel right."
    >
      <ProjectList />
    </CollectionPage>
  );
}
