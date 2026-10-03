import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRecentMatches, getUpcomingMatches } from "@/lib/lolesports";
import { getMatchDetails } from "@/lib/lolesports/details";
import LiveDetailsPage from "./page";

vi.mock("@/lib/lolesports", () => ({
  getRecentMatches: vi.fn(),
  getUpcomingMatches: vi.fn(),
}));
vi.mock("@/lib/lolesports/details", () => ({
  getMatchDetails: vi.fn(),
}));

const mockedGetRecentMatches = vi.mocked(getRecentMatches);
const mockedGetUpcomingMatches = vi.mocked(getUpcomingMatches);
const mockedGetMatchDetails = vi.mocked(getMatchDetails);

const matchDetails = {
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

describe("live details page", () => {
  beforeEach(() => {
    mockedGetMatchDetails.mockResolvedValue(matchDetails);
    mockedGetUpcomingMatches.mockResolvedValue({ matches: [], error: null });
    mockedGetRecentMatches.mockResolvedValue({ matches: [], error: null });
  });

  it("rejects invalid match ids", async () => {
    const markup = renderToStaticMarkup(
      await LiveDetailsPage({ params: Promise.resolve({ id: "invalid" }) }),
    );

    expect(markup).toContain("ID da partida");
  });

  it("loads match details and both sidebar datasets", async () => {
    const markup = renderToStaticMarkup(
      await LiveDetailsPage({ params: Promise.resolve({ id: "123" }) }),
    );

    expect(markup).toContain("League");
    expect(mockedGetUpcomingMatches).toHaveBeenCalledWith(3);
    expect(mockedGetRecentMatches).toHaveBeenCalledWith(3);
  });

  it("shows an unavailable state when details fail", async () => {
    mockedGetMatchDetails.mockRejectedValue(new Error("Details unavailable"));

    const markup = renderToStaticMarkup(
      await LiveDetailsPage({ params: Promise.resolve({ id: "123" }) }),
    );

    expect(markup).toContain("Details unavailable");
  });
});
