import { describe, expect, it } from "vitest";
import { toHomeMatch } from "./mappers";

describe("schedule mappers", () => {
  it("rejects events without the minimum match data", () => {
    expect(toHomeMatch({})).toBeNull();
    expect(toHomeMatch({ match: { id: "match-1" } })).toBeNull();
    expect(toHomeMatch({ match: { id: "match-1", teams: [{ name: "Blue" }] }, startTime: "" })).toBeNull();
  });

  it("fills optional match fields with safe defaults", () => {
    const match = toHomeMatch({
      startTime: "2026-10-03T12:00:00.000Z",
      state: undefined,
      blockName: undefined,
      match: {
        id: "match-1",
        teams: [{}, {}],
        strategy: {},
      },
    });

    expect(match).toMatchObject({
      id: "match-1",
      championship: "LoL Esports",
      stage: "-",
      format: "MD1",
      status: "unstarted",
      teams: [
        { name: "TBD", image: null, score: null },
        { name: "TBD", image: null, score: null },
      ],
    });
  });
});
