import { describe, expect, it } from "vitest";
import { mapMatchDetails } from "./details";

describe("mapMatchDetails", () => {
  it("maps event details and final feed frames into the detail model", () => {
    const result = mapMatchDetails(
      {
        league: { name: "Test League", image: "league.png" },
        match: {
          strategy: { count: 3 },
          teams: [
            { id: "blue-team", name: "Blue Team", code: "BLU", image: "blue.png", result: { gameWins: 2 } },
            { id: "red-team", name: "Red Team", code: "RED", image: "red.png", result: { gameWins: 1 } },
          ],
          games: [
            {
              number: 1,
              id: "game-1",
              state: "completed",
              teams: [
                { id: "blue-team", side: "blue" },
                { id: "red-team", side: "red" },
              ],
              vods: [{ startMillis: 0, endMillis: 2220000 }],
            },
            {
              number: 2,
              id: "game-2",
              state: "unneeded",
              teams: [
                { id: "blue-team", side: "blue" },
                { id: "red-team", side: "red" },
              ],
            },
          ],
        },
      } as never,
      [
        {
          gameId: "game-1",
          startedAt: "2026-09-22T14:57:57Z",
          window: {
            rfc460Timestamp: "2026-09-22T15:00:00Z",
            gameState: "finished",
            blueTeam: {
              totalGold: 50000,
              totalKills: 10,
              towers: 5,
              inhibitors: 1,
              barons: 1,
              dragons: ["ocean"],
              participants: [{ participantId: 1, kills: 10, deaths: 1, assists: 8, creepScore: 200, totalGold: 12000 }],
            },
            redTeam: {
              totalGold: 40000,
              totalKills: 3,
              towers: 2,
              inhibitors: 0,
              barons: 0,
              dragons: [],
              participants: [{ participantId: 6, kills: 3, deaths: 10, assists: 4, creepScore: 180, totalGold: 10000 }],
            },
          },
          metadata: {
            patchVersion: "16.18.819.1060",
            blueTeamMetadata: {
              esportsTeamId: "blue-team",
              participantMetadata: [{ participantId: 1, summonerName: "Blue Player", championId: "Ahri", role: "mid" }],
            },
            redTeamMetadata: {
              esportsTeamId: "red-team",
              participantMetadata: [{ participantId: 6, summonerName: "Red Player", championId: "Azir", role: "mid" }],
            },
          },
          details: {
            participants: [
              { participantId: 1, totalGoldEarned: 12000, items: [3089], championDamageShare: 0.3 },
              { participantId: 6, totalGoldEarned: 10000, items: [6655], championDamageShare: 0.2 },
            ],
          },
        },
      ] as never,
    );

    expect(result.teams.map((team) => team.name)).toEqual(["Blue Team", "Red Team"]);
    expect(result.teams.map((team) => team.score)).toEqual([2, 1]);
    expect(result.games).toHaveLength(1);
    expect(result.games[0].duration).toBe("02:03");
    expect(result.games[0].winnerTeamId).toBe("blue-team");
    expect(result.games[0].players[0].championId).toBe("Ahri");
    expect(result.games[0].players[0].items).toEqual(["3089"]);
    expect(result.patchVersion).toBe("16.18.1");
  });
});
