import { describe, expect, it } from "vitest";
import { getUpcomingEventState } from "./schedule";
import { isWithinUpcomingWindow } from "./schedule-window";

const startTime = "2026-09-23T14:00:00.000Z";

describe("upcoming match window", () => {
  it("keeps a scheduled match visible for one hour after its start time", () => {
    expect(
      isWithinUpcomingWindow(startTime, new Date("2026-09-23T14:59:59.999Z").getTime()),
    ).toBe(true);
    expect(
      isWithinUpcomingWindow(startTime, new Date("2026-09-23T15:00:00.000Z").getTime()),
    ).toBe(true);
    expect(
      isWithinUpcomingWindow(startTime, new Date("2026-09-23T15:00:00.001Z").getTime()),
    ).toBe(false);
  });

  it("marks a started match as pending until the API confirms it is live", () => {
    expect(
      getUpcomingEventState(
        { state: "unstarted", startTime },
        new Date("2026-09-23T14:15:00.000Z").getTime(),
      ),
    ).toBe("pending");
  });
});
