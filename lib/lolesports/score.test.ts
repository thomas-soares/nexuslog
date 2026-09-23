import { describe, expect, it } from "vitest";
import { formatSeriesScore, hasPartialScore } from "./score";
import type { HomeMatch } from "./types";

const match = (homeScore: number | null, awayScore: number | null): HomeMatch => ({
  id: "match-1",
  href: "/lives/match-1",
  time: "14:00",
  date: "Wed, Sep 23, 2026",
  teams: [
    { name: "Home", image: null, score: homeScore },
    { name: "Away", image: null, score: awayScore },
  ],
  championship: "League",
  stage: "Play-Ins",
  format: "MD3",
  status: "unstarted",
});

describe("series score display", () => {
  it("detects when a match has a partial series score", () => {
    expect(hasPartialScore([match(1, 0)])).toBe(true);
    expect(hasPartialScore([match(null, null)])).toBe(false);
    expect(hasPartialScore([match(0, 0)])).toBe(false);
    expect(hasPartialScore([{ ...match(0, 0), status: "inProgress" }])).toBe(true);
  });

  it("leaves the score empty when the series has not started", () => {
    expect(formatSeriesScore(match(null, null))).toBe("");
    expect(formatSeriesScore(match(0, 0))).toBe("");
    expect(formatSeriesScore({ ...match(0, 0), status: "inProgress" })).toBe("0 - 0");
    expect(formatSeriesScore(match(1, null))).toBe("1 - —");
  });
});
