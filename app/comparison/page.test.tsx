import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ComparisonPage from "./page";

describe("comparison page", () => {
  it("renders the breadcrumb, championship selector, and team metrics", async () => {
    const markup = renderToStaticMarkup(await ComparisonPage({}));

    expect(markup).toContain("Comparativo de times");
    expect(markup).toContain("Breadcrumb");
    expect(markup).toContain("CBLOL/2026 Season/Split 1");
    expect(markup).toContain("VKS");
  });

  it("uses the selected mock tournament from the query", async () => {
    const markup = renderToStaticMarkup(
      await ComparisonPage({ searchParams: Promise.resolve({ tournament: "cblol-2025-split-2" }) }),
    );

    expect(markup).toContain("CBLOL/2025 Season/Split 2");
  });
});
