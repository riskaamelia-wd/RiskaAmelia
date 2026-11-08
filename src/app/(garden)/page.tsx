import { PaintingJourney } from "@/features/garden/components/PaintingJourney";
import { PROJECTS } from "@/features/projects/content";
export default function Page() {
  return <PaintingJourney projects={PROJECTS} />;
}
