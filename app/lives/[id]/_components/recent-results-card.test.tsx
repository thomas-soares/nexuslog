import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { HomeMatch } from "@/lib/lolesports";
import { RecentResultsCard } from "./recent-results-card";

const result: HomeMatch = {
  id: "match-1",
  href: "/lives/match-1",
  time: "10:00",
  date: "Sat, Oct 3, 2026",
  teams: [
    { name: "Winner", image: null, score: 2 },
    { name: "Loser", image: null, score: 1 },
  ],
  championship: "League",
  stage: "Final",
  format: "MD3",
  status: "completed",
};

describe("recent results card", () => {
  it("renders the API result and score", () => {
    const markup = renderToStaticMarkup(<RecentResultsCard matches={[result]} />);

    expect(markup).toContain("Winner");
    expect(markup).toContain("2 - 1");
  });

  it("renders an empty state", () => {
    expect(renderToStaticMarkup(<RecentResultsCard matches={[]} />)).toContain(
      "Nenhum resultado recente",
    );
  });
});
