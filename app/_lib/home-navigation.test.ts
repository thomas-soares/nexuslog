import { describe, expect, it } from "vitest";
import { getActiveTab, getCurrentPage, getPageHref, tabContent } from "./home-navigation";

describe("home navigation", () => {
  it("normalizes the active tab", () => {
    expect(getActiveTab(["recent", "upcoming"])).toBe("recent");
    expect(getActiveTab("unknown")).toBe("upcoming");
  });

  it("parses a positive current page", () => {
    expect(getCurrentPage("3")).toBe(3);
    expect(getCurrentPage("invalid")).toBe(1);
  });

  it("builds pagination links for both tabs", () => {
    expect(getPageHref("upcoming", 1)).toBe("/");
    expect(getPageHref("recent", 2)).toBe("/?tab=recent&page=2");
  });

  it("describes the upcoming and recent tabs", () => {
    expect(tabContent.upcoming.title).toBe("Próximas partidas");
    expect(tabContent.recent.title).toBe("Jogos recentes");
  });
});
