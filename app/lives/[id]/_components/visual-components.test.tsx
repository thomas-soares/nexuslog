import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MatchDetailGame, MatchDetailsData, MatchDetailPlayer } from "@/lib/lolesports/details";
import { DragonList } from "./dragon-list";
import { GameCard } from "./game-card";
import { MatchSummaryCard } from "./match-summary-card";
import { ObjectiveStat } from "./objective-stat";
import { PlayersTable } from "./players-table";
import { ResultBadge } from "./result-badge";
import { TeamAvatar } from "./team-avatar";

const players: MatchDetailPlayer[] = [
  {
    teamId: "blue",
    name: "Painter",
    role: "TOP",
    champion: "Gnar",
    championId: "Gnar",
    kills: 3,
    deaths: 1,
    assists: 8,
    cs: 220,
    gold: 12000,
    damageShare: 26,
    diff: 1200,
    items: ["3006"],
  },
  {
    teamId: "red",
    name: "Ale",
    role: "TOP",
    champion: "Renekton",
    championId: "Renekton",
    kills: 1,
    deaths: 3,
    assists: 2,
    cs: 190,
    gold: 10500,
    damageShare: null,
    diff: -800,
    items: [],
  },
];

const game: MatchDetailGame = {
  id: "game-1",
  number: 1,
  state: "finished",
  duration: "34:57",
  winnerTeamId: "blue",
  teams: [
    {
      teamId: "blue",
      side: "blue",
      kills: 25,
      gold: 74000,
      towers: 10,
      inhibitors: 2,
      barons: 1,
      dragons: ["fire"],
    },
    {
      teamId: "red",
      side: "red",
      kills: 16,
      gold: 65000,
      towers: 4,
      inhibitors: 0,
      barons: 0,
      dragons: [],
    },
  ],
  players,
};

const match: MatchDetailsData = {
  leagueName: "EMEA Masters",
  leagueImage: null,
  bestOf: 3,
  teams: [
    { id: "blue", name: "Blue Team", shortName: "BLU", image: null, score: 1 },
    { id: "red", name: "Red Team", shortName: "RED", image: null, score: 0 },
  ],
  games: [game],
  patchVersion: "16.18",
};

describe("visual match components", () => {
  it("renders shared match visuals and both objective sides", () => {
    const markup = renderToStaticMarkup(
      <>
        <TeamAvatar alt="Blue Team" />
        <ResultBadge>VitÃ³ria</ResultBadge>
        <DragonList dragons={["fire", "water"]} align="right" />
        <ObjectiveStat count={2} icon="baron" side="blue" />
        <ObjectiveStat count={1} icon="dragon" side="red" />
      </>,
    );

    expect(markup).toContain('alt="Blue Team"');
    expect(markup).toContain("VitÃ³ria");
    expect(markup).toContain('aria-label="baron"');
    expect(markup).toContain('aria-label="dragon"');
  });

  it("renders summary, game and player statistics", () => {
    const markup = renderToStaticMarkup(
      <>
        <MatchSummaryCard match={match} />
        <GameCard game={game} match={match} />
        <PlayersTable teamId="blue" teamName="BLU" players={players} patchVersion="16.18" />
      </>,
    );

    expect(markup).toContain("EMEA Masters");
    expect(markup).toContain("34:57");
    expect(markup).toContain("Painter");
    expect(markup).toContain("25");
  });
});
