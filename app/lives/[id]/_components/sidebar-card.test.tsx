import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ResultBadge, SidebarCard, TeamAvatar } from "./sidebar-card";

describe("sidebar primitives", () => {
  it("renders a titled card and result badge", () => {
    const markup = renderToStaticMarkup(
      <SidebarCard title="Resultados">
        <ResultBadge>2 - 1</ResultBadge>
      </SidebarCard>,
    );

    expect(markup).toContain("Resultados");
    expect(markup).toContain("2 - 1");
  });

  it("renders a team avatar when an image is available", () => {
    const markup = renderToStaticMarkup(<TeamAvatar src="https://example.com/team.png" alt="Team" />);

    expect(markup).toContain("team.png");
    expect(markup).toContain('alt="Team"');
  });
});
