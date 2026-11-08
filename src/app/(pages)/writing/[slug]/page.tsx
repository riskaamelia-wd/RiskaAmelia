import { ArticleDetail } from "@/features/writing/components/ArticleDetail";
import { getArticleMetadata } from "@/features/writing/metadata";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return getArticleMetadata((await params).slug);
}
export default async function Page({ params }: Props) {
  return <ArticleDetail slug={(await params).slug} />;
}

export { getArticleStaticParams as generateStaticParams } from "@/features/writing/content";
export const dynamicParams = false;
