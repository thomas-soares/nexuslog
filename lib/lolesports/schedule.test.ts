import { beforeEach, describe, expect, it, vi } from "vitest";
import { getScheduleEvents } from "./client";
import { getRecentMatches, isUpcomingOrLiveEvent } from "./schedule";

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

describe("upcoming matches", () => {
  it("keeps live matches visible after the upcoming window expires", () => {
    const now = new Date("2026-10-03T15:00:00.000Z").getTime();

    expect(
      isUpcomingOrLiveEvent(
        {
          state: "inProgress",
          startTime: "2026-10-03T12:00:00.000Z",
          match: { strategy: { count: 3 } },
        },
        now,
      ),
    ).toBe(true);
  });

  it("keeps scheduled matches inside the upcoming window", () => {
    const now = new Date("2026-10-03T15:00:00.000Z").getTime();

    expect(
      isUpcomingOrLiveEvent(
        {
          state: "unstarted",
          startTime: "2026-10-03T15:30:00.000Z",
          match: { strategy: { count: 3 } },
        },
        now,
      ),
    ).toBe(true);
  });
});
