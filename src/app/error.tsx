"use client";
import { useEffect } from "react";
import { captureException } from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);
  return (
    <div
      className="page-shell flex min-h-[65vh] flex-col items-start justify-center gap-6 py-16"
      role="alert"
    >
      <h1 className="section-heading">Something went off-script.</h1>
      <p className="max-w-lg leading-7 text-muted-foreground">
        This page couldn’t load. Try again, or return home using the navigation
        above.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
