export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute left-[37%] top-[8%] h-[82%] w-[26%] rounded-sm bg-foreground" />
      <div className="absolute left-[8%] top-[37%] h-[26%] w-[82%] rounded-sm bg-foreground" />
      <div className="absolute left-[52%] top-[20%] h-[26%] w-[26%] rounded-full border-[3px] border-background bg-foreground" />
      <div className="absolute left-[20%] top-[52%] h-[26%] w-[26%] rounded-full border-[3px] border-background bg-foreground" />
    </div>
  );
}
