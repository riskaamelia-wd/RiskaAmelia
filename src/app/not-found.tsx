import Link from "next/link";
import { CatArtwork } from "@/components/common/CatArtwork";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[65vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="cat-art w-32">
        <CatArtwork />
      </div>
      <h1 className="section-heading">A little lost?</h1>
      <p className="max-w-md leading-7 text-muted-foreground">
        This page isn’t here. Let’s head back to somewhere familiar.
      </p>
      <Button asChild className="rounded-full">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
