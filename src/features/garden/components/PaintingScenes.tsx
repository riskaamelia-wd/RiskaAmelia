import Image from "next/image";
const SCENES = [
  {
    id: "pond",
    src: "/images/water-lily-pond.webp",
    alt: "A blue-green impressionist pond, with willow reflections and pale water lilies.",
  },
  {
    id: "bridge",
    src: "/images/garden-bridge.webp",
    alt: "A garden footbridge over a quiet pond, surrounded by soft green foliage.",
  },
  {
    id: "lilies",
    src: "/images/lilies-close.webp",
    alt: "Water lilies and soft circular ripples, painted in cool blue and sage.",
  },
];
export function PaintingScenes({ active }: { active: number }) {
  return (
    <div className="painting-scenes" aria-hidden="true">
      {SCENES.map((scene, index) => (
        <div
          key={scene.id}
          data-scene={scene.id}
          data-visible={(active < 2 ? 0 : active < 4 ? 1 : 2) === index}
          className="painting-scene"
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          <Image
            src={scene.src}
            alt={scene.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
            className="object-cover"
          />
        </div>
      ))}
      <div data-foreground className="painting-foreground">
        <Image
          src="/images/willow-foreground.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="painting-shade" />
      <div className="pond-light" />
    </div>
  );
}
