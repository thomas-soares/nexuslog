import Link from "next/link";
import { HomeTabs } from "./_components/home-tabs";
import { HomeMatchPanel } from "./_components/home-match-panel";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import {
  ALL_UPCOMING_LIMIT,
  PAGE_SIZE,
  getActiveTab,
  getCurrentPage,
} from "./_lib/home-navigation";
import { getRecentMatches, getUpcomingMatches } from "@/lib/lolesports";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[]; page?: string | string[] }>;
}) {
  const query = await searchParams;
  const activeTab = getActiveTab(query.tab);
  const requestedPage = getCurrentPage(query.page);
  const { matches, error } =
      activeTab === "recent"
      ? await getRecentMatches()
      : await getUpcomingMatches(ALL_UPCOMING_LIMIT);
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedMatches = matches.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex flex-1 flex-col gap-4 md:gap-8 container px-4 md:px-8">
        <div className="flex flex-col gap-4 pt-4 sm:pt-8 md:gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
            <h1 className="text-2xl font-bold leading-8 tracking-tight text-foreground">
              NexusLog
            </h1>
            <p className="text-base font-normal leading-6 text-muted-foreground">
              Conteúdo competitivo de League of Legends
            </p>
            </div>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              href="/comparison"
            >
              Comparativo de times
            </Link>
          </div>

          <div>
            <div className="xl:col-span-3">
              <HomeTabs activeTab={activeTab} />
              <HomeMatchPanel
                activeTab={activeTab}
                currentPage={currentPage}
                error={error}
                matches={paginatedMatches}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
