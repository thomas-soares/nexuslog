import { beforeEach, describe, expect, it, vi } from "vitest";
import { getScheduleEvents } from "./client";
import { getRecentMatches } from "./schedule";

vi.mock("./client", () => ({
  getScheduleEvents: vi.fn(),
}));

const mockedGetScheduleEvents = vi.mocked(getScheduleEvents);

describe("recent matches", () => {
  beforeEach(() => {
    mockedGetScheduleEvents.mockReset();
  });

  it("returns every completed match when no limit is provided", async () => {
    mockedGetScheduleEvents.mockResolvedValue(
      Array.from({ length: 25 }, (_, index) => ({
        id: `event-${index}`,
        startTime: new Date(Date.now() - (index + 1) * 60_000).toISOString(),
        state: "completed",
        match: {
          id: `match-${index}`,
          teams: [{ name: "Blue" }, { name: "Red" }],
          strategy: { count: 1 },
        },
      })),
    );

    const result = await getRecentMatches();

    expect(result.matches).toHaveLength(25);
  });
});
