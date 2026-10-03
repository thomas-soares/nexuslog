import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "inter" }),
}));

import RootLayout from "./layout";

describe("root layout", () => {
  it("renders the document shell and children", () => {
    const markup = renderToStaticMarkup(
      <RootLayout params={Promise.resolve({})}>
        <main>Content</main>
      </RootLayout>,
    );

    expect(markup).toContain('lang="pt-BR"');
    expect(markup).toContain("Content");
    expect(markup).toContain("inter");
  });
});
