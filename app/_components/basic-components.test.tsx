import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BrandMark } from "./brand-mark";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

describe("basic site components", () => {
  it("renders the brand mark with its default and custom sizes", () => {
    expect(renderToStaticMarkup(<BrandMark />)).toContain("h-8 w-8");
    expect(renderToStaticMarkup(<BrandMark className="h-4 w-4" />)).toContain("h-4 w-4");
  });

  it("renders the header and footer navigation", () => {
    const header = renderToStaticMarkup(<SiteHeader />);
    const footer = renderToStaticMarkup(<SiteFooter />);

    expect(header).toContain("NexusLog");
    expect(header).toContain("Feedback");
    expect(footer).toContain("2026 NexusLog");
    expect(footer).toContain("Política de Privacidade");
  });
});
