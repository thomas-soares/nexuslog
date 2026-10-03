import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRecentMatches, getUpcomingMatches } from "@/lib/lolesports";
import Home from "./page";

vi.mock("@/lib/lolesports", () => ({
  getRecentMatches: vi.fn(),
  getUpcomingMatches: vi.fn(),
}));

const mockedGetRecentMatches = vi.mocked(getRecentMatches);
const mockedGetUpcomingMatches = vi.mocked(getUpcomingMatches);

const match = {
  id: "match-1",
  href: "/lives/match-1",
  time: "10:00",
  date: "Sat, Oct 3, 2026",
  teams: [
    { name: "Blue", image: null, score: null },
    { name: "Red", image: null, score: null },
  ] as [{ name: string; image: null; score: null }, { name: string; image: null; score: null }],
  championship: "League",
  stage: "Regular Season",
  format: "MD1",
  status: "unstarted",
};

describe("home page", () => {
  beforeEach(() => {
    mockedGetRecentMatches.mockResolvedValue({ matches: [], error: null });
    mockedGetUpcomingMatches.mockResolvedValue({ matches: [match], error: null });
  });

  it("renders upcoming matches by default", async () => {
    const markup = renderToStaticMarkup(
      await Home({ searchParams: Promise.resolve({}) }),
    );

    expect(markup).toContain("NexusLog");
    expect(markup).toContain("/comparison");
    expect(markup).toContain("Blue");
    expect(mockedGetUpcomingMatches).toHaveBeenCalledWith(1000);
  });

  it("renders recent matches when the recent tab is selected", async () => {
    mockedGetRecentMatches.mockResolvedValue({ matches: [match], error: null });

    const markup = renderToStaticMarkup(
      await Home({ searchParams: Promise.resolve({ tab: "recent" }) }),
    );

    expect(markup).toContain("Jogos recentes");
    expect(mockedGetRecentMatches).toHaveBeenCalledWith();
  });
});
