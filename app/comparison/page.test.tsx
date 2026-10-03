import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ComparisonPage from "./page";

describe("comparison page", () => {
  it("renders the breadcrumb, championship selector, and team metrics", () => {
    const markup = renderToStaticMarkup(<ComparisonPage />);

    expect(markup).toContain("Comparativo de times");
    expect(markup).toContain("Breadcrumb");
    expect(markup).toContain("CBLOL 2026 Season/Split 1");
    expect(markup).toContain("VKS");
  });
});
