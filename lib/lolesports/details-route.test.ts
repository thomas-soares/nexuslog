import { describe, expect, it } from "vitest";
import { isValidMatchId } from "./details-route";

describe("isValidMatchId", () => {
  it("accepts a numeric match ID outside the old test allowlist", () => {
    expect(isValidMatchId("999999999999999999")).toBe(true);
  });

  it("rejects empty and non-numeric IDs", () => {
    expect(isValidMatchId("")).toBe(false);
    expect(isValidMatchId("match-test")).toBe(false);
  });
});
