import Link from "next/link";
import { PaintedCat } from "@/components/common/PaintedCat";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[65vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="w-32">
        <PaintedCat />
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
