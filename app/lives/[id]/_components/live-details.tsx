import { MatchesSidebar, ResultsSidebar } from "../match-sidebar-widgets";
import { games } from "../data/mock-match";
import { GameCard } from "./game-card";
import { MatchSummaryCard } from "./match-summary-card";

export function LiveDetails() {
  return (
    <div className="flex flex-1 flex-col gap-4 min-w-0 container mx-auto px-0">
      <div className="grid flex-1 items-start gap-4 lg:grid-cols-10">
        <div className="flex flex-col gap-2 md:gap-4 lg:col-span-7">
          <MatchSummaryCard />
          <div dir="ltr" data-orientation="horizontal" className="col-span-3">
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
              tabIndex={0}
              data-orientation="horizontal"
            >
              {games.map((game) => (
                <button
                  key={game.number}
                  type="button"
                  role="tab"
                  aria-selected={game.number === 1}
                  data-state={game.number === 1 ? "active" : "inactive"}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                >
                  Jogo {game.number}
                </button>
              ))}
            </div>
            <div
              data-state="active"
              data-orientation="horizontal"
              role="tabpanel"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <GameCard game={games[0]} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 lg:col-span-3">
          <MatchesSidebar />
          <ResultsSidebar />
        </div>
      </div>
    </div>
  );
}
