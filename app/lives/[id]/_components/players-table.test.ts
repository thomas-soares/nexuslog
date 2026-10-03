import { describe, expect, it } from "vitest";
import { formatPlayerLabel } from "../../../../lib/lolesports/player-name";

describe("formatPlayerLabel", () => {
  it("does not duplicate a team tag already included in the API player name", () => {
    expect(formatPlayerLabel("T1A", "T1A Painter")).toBe("T1A Painter");
  });

  it("keeps the team tag for legacy player names without it", () => {
    expect(formatPlayerLabel("JDG", "Ale")).toBe("JDG Ale");
  });
});
