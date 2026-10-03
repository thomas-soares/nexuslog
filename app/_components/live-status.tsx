export function LiveStatus() {
  return (
    <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden="true" />
        <span>Ao vivo</span>
      </span>
    </span>
  );
}
