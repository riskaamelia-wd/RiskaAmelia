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
      title="A gallery of my work."
      description="A collection of software projects, seen through the light and color of an impressionist garden."
    >
      <ProjectList />
    </CollectionPage>
  );
}
