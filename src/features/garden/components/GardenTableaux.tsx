import Image from "next/image";
const TABLEAUX = {
  1: { className: "garden-portrait", src: "/images/riska-portrait.webp" },
  4: { className: "garden-lily-study", src: "/images/lilies-close.webp" },
} as const;
export function GardenTableaux({ active }: { active: number }) {
  if (active !== 1 && active !== 4) return null;
  const tableau = TABLEAUX[active];
  return (
    <div className={`garden-tableau ${tableau.className}`} aria-hidden="true">
      <div className="garden-tableau-canvas">
        <Image
          src={tableau.src}
          alt=""
          fill
          sizes="(max-width: 767px) 54vw, 32vw"
          className="object-cover"
        />
      </div>
      <div className="garden-tableau-reflection">
        <Image
          src={tableau.src}
          alt=""
          fill
          sizes="(max-width: 767px) 54vw, 32vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
