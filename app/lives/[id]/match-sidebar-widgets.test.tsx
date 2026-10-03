import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { HomeMatch } from "@/lib/lolesports";
import { MatchSidebar } from "./match-sidebar-widgets";

const match: HomeMatch = {
  id: "match-1",
  href: "/lives/match-1",
  time: "10:00",
  date: "Sat, Oct 3, 2026",
  teams: [
    { name: "Blue", image: null, score: 2 },
    { name: "Red", image: null, score: 1 },
  ],
  championship: "League",
  stage: "Final",
  format: "MD3",
  status: "completed",
};

describe("match sidebar", () => {
  it("composes upcoming matches and recent results cards", () => {
    const markup = renderToStaticMarkup(
      <MatchSidebar upcomingMatches={[match]} recentMatches={[match]} />,
    );

    expect(markup).toContain("Partidas");
    expect(markup).toContain("Resultados");
    expect(markup).toContain("2 - 1");
  });
});
