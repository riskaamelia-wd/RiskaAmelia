import Image from "next/image";
export function PaintedCat({ className }: { className?: string }) {
  return (
    <Image
      src="/images/monet-cat.webp"
      alt=""
      aria-hidden="true"
      width={640}
      height={716}
      sizes="(max-width: 767px) 100px, 160px"
      className={className}
    />
  );
}
