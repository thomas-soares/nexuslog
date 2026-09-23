/* eslint-disable @next/next/no-img-element */

type TeamAvatarProps = {
  src: string;
  alt: string;
  size?: string;
};

export function TeamAvatar({ src, alt, size = "h-14 w-14" }: TeamAvatarProps) {
  return (
    <span
      className={`relative flex shrink-0 overflow-hidden bg-secondary p-3 rounded-md ${size}`}
    >
      <img
        className="aspect-square h-full w-full object-contain"
        alt={alt}
        src={src}
      />
    </span>
  );
}
