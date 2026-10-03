import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TeamComparisonTable } from "./team-comparison-table";
import { comparisonTeams } from "./comparison-data";

describe("team comparison table", () => {
  it("renders the championship metrics for each team", () => {
    const markup = renderToStaticMarkup(
      <TeamComparisonTable teams={comparisonTeams.slice(0, 2)} />,
    );

    expect(markup).toContain("Winrate");
    expect(markup).toContain("Winrate Blue");
    expect(markup).toContain("Tempo médio");
    expect(markup).toContain("1º Larva");
    expect(markup).toContain(comparisonTeams[0].team);
    expect(markup).toContain("56.2%");
    expect(markup).toContain("13.8");
  });

  it("renders an empty state when there are no teams", () => {
    expect(renderToStaticMarkup(<TeamComparisonTable teams={[]} />)).toContain(
      "Nenhum time encontrado",
    );
  });
});
