import Link from "next/link";
import type { ReactNode } from "react";
import type { HomeTab } from "../_lib/home-navigation";

function TabLink({
  activeTab,
  tab,
  children,
}: {
  activeTab: HomeTab;
  tab: HomeTab;
  children: ReactNode;
}) {
  const isActive = activeTab === tab;

  return (
    <Link
      href={tab === "proximas" ? "/" : "/?tab=recentes"}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
    >
      {children}
    </Link>
  );
}

export function HomeTabs({ activeTab }: { activeTab: HomeTab }) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
    >
      <TabLink activeTab={activeTab} tab="proximas">
        Proximas
      </TabLink>
      <TabLink activeTab={activeTab} tab="recentes">
        Recentes
      </TabLink>
    </div>
  );
}
