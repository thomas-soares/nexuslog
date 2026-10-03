import { describe, expect, it } from "vitest";
import { isCompletedSeries, isFullyCompletedSeries, isInProgressSeries } from "./series";

describe("series state helpers", () => {
  it("recognizes completed series by state or score", () => {
    expect(isCompletedSeries({ state: "completed" })).toBe(true);
    expect(
      isCompletedSeries({ state: "inProgress", match: { strategy: { count: 3 }, teams: [{ result: { gameWins: 2 } }] } }),
    ).toBe(true);
    expect(isFullyCompletedSeries({ state: "completed" })).toBe(true);
    expect(isFullyCompletedSeries({ state: "inProgress" })).toBe(false);
  });

  it("recognizes started and live series", () => {
    expect(isInProgressSeries({ state: "inProgress" })).toBe(true);
    expect(
      isInProgressSeries({ state: "unstarted", match: { strategy: { count: 3 }, teams: [{ result: { gameWins: 1 } }] } }),
    ).toBe(true);
    expect(isInProgressSeries({ state: "unstarted" })).toBe(false);
  });
});
