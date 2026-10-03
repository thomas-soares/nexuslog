import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { HomeMatch } from "@/lib/lolesports";
import { HomeMatchPanel } from "./home-match-panel";

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

describe("home match panel", () => {
  it("renders the match list and pagination", () => {
    const markup = renderToStaticMarkup(
      <HomeMatchPanel
        activeTab="upcoming"
        currentPage={1}
        error={null}
        matches={[match]}
        totalPages={1}
      />,
    );

    expect(markup).toContain("Próximas partidas");
    expect(markup).toContain("Blue");
    expect(markup).toContain("Pagina 1 de 1");
  });

  it("renders an error message", () => {
    expect(
      renderToStaticMarkup(
        <HomeMatchPanel
          activeTab="recent"
          currentPage={1}
          error="Failed to load matches."
          matches={[]}
          totalPages={1}
        />,
      ),
    ).toContain("Failed to load matches.");
  });
});
