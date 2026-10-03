import { describe, expect, it } from "vitest";
import { getActiveTab, getCurrentPage, getPageHref, tabContent } from "./home-navigation";

describe("home navigation", () => {
  it("normalizes the selected tab and page", () => {
    expect(getActiveTab(["recentes", "proximas"])).toBe("recentes");
    expect(getActiveTab("unknown")).toBe("proximas");
    expect(getCurrentPage(["3"])).toBe(3);
    expect(getCurrentPage("invalid")).toBe(1);
  });

  it("builds pagination links for both tabs", () => {
    expect(getPageHref("proximas", 1)).toBe("/");
    expect(getPageHref("proximas", 2)).toBe("/?page=2");
    expect(getPageHref("recentes", 2)).toBe("/?tab=recentes&page=2");
  });

  it("describes the upcoming and recent tabs", () => {
    expect(tabContent.proximas.title).toBe("Próximas partidas");
    expect(tabContent.recentes.title).toBe("Jogos recentes");
  });
});
