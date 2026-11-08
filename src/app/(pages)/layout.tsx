import { PaintingPageShell } from "@/components/layout/PaintingPageShell";
export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PaintingPageShell>{children}</PaintingPageShell>;
}
