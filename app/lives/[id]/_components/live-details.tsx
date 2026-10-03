"use client";

import { useState } from "react";
import type { HomeMatch } from "@/lib/lolesports";
import type { MatchDetailsData } from "@/lib/lolesports/details";
import { MatchSidebar } from "../match-sidebar-widgets";
import { GameCard } from "./game-card";
import { MatchSummaryCard } from "./match-summary-card";

export function LiveDetails({
  match,
  upcomingMatches,
  recentMatches,
}: {
  match: MatchDetailsData;
  upcomingMatches: HomeMatch[];
  recentMatches: HomeMatch[];
}) {
  const [activeGameNumber, setActiveGameNumber] = useState(match.games[0]?.number ?? 1);
  const activeGame = match.games.find((game) => game.number === activeGameNumber) ?? match.games[0];

  if (!activeGame) {
    return <MatchSummaryCard match={match} />;
  }

  return (
    <div className="container mx-auto flex min-w-0 flex-1 flex-col gap-4 px-0">
      <div className="grid flex-1 items-start gap-4 lg:grid-cols-10">
        <div className="flex min-w-0 flex-col gap-2 md:gap-4 lg:col-span-7">
          <MatchSummaryCard match={match} />
          <div dir="ltr" data-orientation="horizontal">
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
            >
              {match.games.map((game) => (
                <button
                  key={game.number}
                  type="button"
                  role="tab"
                  aria-selected={game.number === activeGame.number}
                  data-state={game.number === activeGame.number ? "active" : "inactive"}
                  onClick={() => setActiveGameNumber(game.number)}
                  className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
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
              <GameCard game={activeGame} match={match} />
            </div>
          </div>
        </div>
        <aside className="flex min-w-0 flex-col gap-4 lg:col-span-3">
          <MatchSidebar upcomingMatches={upcomingMatches} recentMatches={recentMatches} />
        </aside>
      </div>
    </div>
  );
}
