import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Pagination } from "./pagination";

describe("pagination", () => {
  it("disables navigation at the first page", () => {
    const markup = renderToStaticMarkup(
      <Pagination activeTab="upcoming" currentPage={1} totalPages={3} />,
    );

    expect(markup).toContain("Pagina 1 de 3");
    expect(markup).toContain("opacity-50");
    expect(markup).toContain('href="/?page=2"');
  });

  it("renders links for a middle page", () => {
    const markup = renderToStaticMarkup(
      <Pagination activeTab="recent" currentPage={2} totalPages={3} />,
    );

    expect(markup).toContain('href="/?tab=recent"');
    expect(markup).toContain('href="/?tab=recent&amp;page=3"');
  });
});
