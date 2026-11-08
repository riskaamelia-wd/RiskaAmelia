import { ProjectDetail } from "@/features/projects/components/ProjectDetail";
import { getProjectMetadata } from "@/features/projects/metadata";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return getProjectMetadata((await params).slug);
}
export default async function Page({ params }: Props) {
  return <ProjectDetail slug={(await params).slug} />;
}

export { getProjectStaticParams as generateStaticParams } from "@/features/projects/content";
export const dynamicParams = false;
