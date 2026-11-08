import { Skeleton } from "@/components/ui/skeleton";
export function PageLoading() {
  return (
    <div
      className="page-shell flex min-h-[65vh] flex-col gap-8 py-20"
      role="status"
    >
      <span className="sr-only">Loading page…</span>
      <Skeleton className="h-14 w-3/4 max-w-lg" />
      <Skeleton className="h-6 w-2/3 max-w-md" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
