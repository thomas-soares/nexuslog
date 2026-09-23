import type { ReactNode } from "react";

export function ResultBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
      {children}
    </div>
  );
}
