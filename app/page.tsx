import { HomeTabs } from "./_components/home-tabs";
import { HomeMatchPanel } from "./_components/home-match-panel";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import {
  ALL_UPCOMING_LIMIT,
  PAGE_SIZE,
  RECENT_LIMIT,
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
  const limit = activeTab === "recentes" ? RECENT_LIMIT : ALL_UPCOMING_LIMIT;
  const { matches, error } =
    activeTab === "recentes"
      ? await getRecentMatches(limit)
      : await getUpcomingMatches(limit);
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
          <div>
            <h1 className="text-2xl font-bold leading-8 tracking-tight text-foreground">
              NexusLog HUB
            </h1>
            <p className="text-base font-normal leading-6 text-muted-foreground">
              HUB de conteudo competitivo
            </p>
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
