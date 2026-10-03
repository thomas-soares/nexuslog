/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

export function SidebarCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-start space-y-1.5 bg-muted/50 p-4">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-7">
          <div className="grid gap-1">
            <div className="font-semibold leading-none tracking-tight">{title}</div>
          </div>
        </div>
      </div>
      <div className="divide-y p-0">{children}</div>
    </div>
  );
}

export function TeamAvatar({ src, alt, size = "h-6 w-6 rounded-md p-1" }: {
  src?: string;
  alt: string;
  size?: string;
}) {
  return (
    <span className={`relative flex shrink-0 overflow-hidden bg-secondary ${size}`}>
      {src ? <img className="aspect-square h-full w-full object-contain" alt={alt} src={src} /> : null}
    </span>
  );
}

export function ResultBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      {children}
    </div>
  );
}
