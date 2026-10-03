import { beforeEach, describe, expect, it, vi } from "vitest";
import { getScheduleEvents } from "./client";
import {
  getRecentMatches,
  getUpcomingMatches,
  isUpcomingOrLiveEvent,
} from "./schedule";

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

  it("puts live matches before scheduled matches and marks started matches pending", async () => {
    const now = Date.now();
    mockedGetScheduleEvents.mockResolvedValue([
      {
        id: "future-late",
        startTime: new Date(now + 30 * 60_000).toISOString(),
        state: "unstarted",
        match: { id: "future-late", teams: [{ name: "Late A" }, { name: "Late B" }] },
      },
      {
        id: "live",
        startTime: new Date(now - 2 * 60 * 60_000).toISOString(),
        state: "inProgress",
        match: { id: "live", teams: [{ name: "Live A" }, { name: "Live B" }] },
      },
      {
        id: "pending",
        startTime: new Date(now - 15 * 60_000).toISOString(),
        state: "unstarted",
        match: { id: "pending", teams: [{ name: "Pending A" }, { name: "Pending B" }] },
      },
      {
        id: "completed",
        startTime: new Date(now - 2 * 60 * 60_000).toISOString(),
        state: "completed",
        match: { id: "completed", teams: [{ name: "Done A" }, { name: "Done B" }] },
      },
    ]);

    const result = await getUpcomingMatches();

    expect(result.matches.map((match) => match.id)).toEqual(["live", "pending", "future-late"]);
    expect(result.matches[1].status).toBe("pending");
  });

  it("returns a readable error when loading upcoming matches fails", async () => {
    mockedGetScheduleEvents.mockRejectedValue(new Error("network down"));

    await expect(getUpcomingMatches()).resolves.toEqual({
      matches: [],
      error: "network down",
    });
  });
});

describe("recent matches errors", () => {
  it("returns a fallback error for non-Error failures", async () => {
    mockedGetScheduleEvents.mockRejectedValue("network down");

    await expect(getRecentMatches(3)).resolves.toEqual({
      matches: [],
      error: "Failed to load matches.",
    });
  });
});
