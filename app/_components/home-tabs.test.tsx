import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomeTabs } from "./home-tabs";

describe("home tabs", () => {
  it("marks the selected tab and links to both views", () => {
    const markup = renderToStaticMarkup(<HomeTabs activeTab="recentes" />);

    expect(markup).toContain('aria-selected="false"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain('href="/?tab=recentes"');
    expect(markup).toContain("Proximas");
    expect(markup).toContain("Recentes");
  });
});
