/* eslint-disable @next/next/no-img-element */

function dragonImageUrl(type: string) {
  return `/images/dragons/dragon-${type}.svg`;
}

export function DragonList({
  dragons,
  align = "left",
}: {
  dragons: string[];
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex min-w-[96px] gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      {dragons.map((dragon, index) => (
        <img
          key={`${dragon}-${index}`}
          alt={dragon}
          width="19"
          height="19"
          src={dragonImageUrl(dragon)}
        />
      ))}
    </div>
  );
}
