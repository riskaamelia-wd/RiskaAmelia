import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export function CollectionPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-shell">
      <Link href="/" className="text-link mb-8 text-sm">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back home
      </Link>
      <h1 className="section-heading">{title}</h1>
      <p className="mb-10 mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
      {children}
    </div>
  );
}
