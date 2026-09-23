import type { HomeMatch } from "@/lib/lolesports";
import type { HomeTab } from "../_lib/home-navigation";
import { tabContent } from "../_lib/home-navigation";
import { MatchTable } from "./match-table";
import { Pagination } from "./pagination";

export function HomeMatchPanel({
  activeTab,
  currentPage,
  error,
  matches,
  totalPages,
}: {
  activeTab: HomeTab;
  currentPage: number;
  error: string | null;
  matches: HomeMatch[];
  totalPages: number;
}) {
  const content = tabContent[activeTab];

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
            <div className="grid gap-1">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {content.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {content.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="space-y-4">
            {error ? (
              <div className="rounded-md border border-destructive/50 p-4 text-sm text-destructive">
                {error}
              </div>
            ) : (
              <>
                <MatchTable
                  matches={matches}
                  showScore={activeTab === "recentes"}
                  showDetails={activeTab === "recentes"}
                  showLiveStatus={activeTab === "proximas"}
                  detailsLabel="Ver"
                />
                <Pagination
                  activeTab={activeTab}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
