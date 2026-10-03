import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MatchDetailsData } from "@/lib/lolesports/details";
import { LiveDetails } from "./live-details";

const baseMatch: MatchDetailsData = {
  leagueName: "League",
  leagueImage: null,
  bestOf: 1,
  teams: [
    { id: "blue", name: "Blue", shortName: "BLU", image: null, score: 1 },
    { id: "red", name: "Red", shortName: "RED", image: null, score: 0 },
  ],
  games: [],
  patchVersion: "16.18",
};

describe("live details", () => {
  it("falls back to the summary when there are no games", () => {
    const markup = renderToStaticMarkup(
      <LiveDetails match={baseMatch} upcomingMatches={[]} recentMatches={[]} />,
    );

    expect(markup).toContain("League");
    expect(markup).toContain("Blue");
  });

  it("renders the game tabs and sidebar when a game exists", () => {
    const match: MatchDetailsData = {
      ...baseMatch,
      games: [
        {
          id: "game-1",
          number: 1,
          state: "finished",
          duration: "30:00",
          winnerTeamId: "blue",
          teams: [
            {
              teamId: "blue",
              side: "blue",
              kills: 1,
              gold: 1000,
              towers: 1,
              inhibitors: 0,
              barons: 0,
              dragons: [],
            },
            {
              teamId: "red",
              side: "red",
              kills: 0,
              gold: 900,
              towers: 0,
              inhibitors: 0,
              barons: 0,
              dragons: [],
            },
          ],
          players: [],
        },
      ],
    };

    const markup = renderToStaticMarkup(
      <LiveDetails match={match} upcomingMatches={[]} recentMatches={[]} />,
    );

    expect(markup).toContain("Jogo 1");
    expect(markup).toContain("Partidas");
    expect(markup).toContain("Resultados");
  });
});
