"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
// Resource failure belongs to this image instance, not a global UI store.
export function ContentImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div role="img" aria-label={props.alt} className={props.className}>
        <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-2xl bg-muted p-6 text-center text-muted-foreground">
          <ImageOff aria-hidden="true" className="size-8" />
          <span>{props.alt}</span>
        </div>
      </div>
    );
  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
