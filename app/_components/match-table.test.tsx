import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { HomeMatch } from "@/lib/lolesports";
import { MatchTable } from "./match-table";

const match: HomeMatch = {
  id: "match-1",
  href: "/lives/match-1",
  time: "10:00",
  date: "Sat, Oct 3, 2026",
  teams: [
    { name: "Blue", image: null, score: 1 },
    { name: "Red", image: null, score: 0 },
  ],
  championship: "League",
  stage: "Regular Season",
  format: "MD3",
  status: "inProgress",
};

describe("match table", () => {
  it("renders scores, live status, and details when enabled", () => {
    const markup = renderToStaticMarkup(
      <MatchTable
        matches={[match]}
        showScore
        showLiveStatus
        showDetails
        scoreLabel="Resultado parcial"
        detailsLabel="Ver"
      />,
    );

    expect(markup).toContain("Blue");
    expect(markup).toContain("1 - 0");
    expect(markup).toContain("Ao vivo");
    expect(markup).toContain("Detalhes");
  });

  it("renders an empty state", () => {
    expect(renderToStaticMarkup(<MatchTable matches={[]} />)).toContain(
      "Nenhuma partida encontrada no momento",
    );
  });
});
