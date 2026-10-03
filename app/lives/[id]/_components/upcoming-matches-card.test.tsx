import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { HomeMatch } from "@/lib/lolesports";
import { UpcomingMatchesCard } from "./upcoming-matches-card";

const match: HomeMatch = {
  id: "match-1",
  href: "/lives/match-1",
  time: "10:00",
  date: "Sat, Oct 3, 2026",
  teams: [
    { name: "Blue", image: null, score: null },
    { name: "Red", image: null, score: null },
  ],
  championship: "League",
  stage: "Regular Season",
  format: "MD1",
  status: "unstarted",
};

describe("upcoming matches card", () => {
  it("renders scheduled matches without the year", () => {
    const markup = renderToStaticMarkup(<UpcomingMatchesCard matches={[match]} />);

    expect(markup).toContain("Blue");
    expect(markup).toContain("Sat, Oct 3, 10:00");
    expect(markup).not.toContain("2026");
  });

  it("renders the live status and empty state", () => {
    const liveMarkup = renderToStaticMarkup(
      <UpcomingMatchesCard matches={[{ ...match, status: "inProgress" }]} />,
    );
    const emptyMarkup = renderToStaticMarkup(<UpcomingMatchesCard matches={[]} />);

    expect(liveMarkup).toContain("Ao vivo");
    expect(emptyMarkup).toContain("Nenhuma partida próxima");
  });
});
