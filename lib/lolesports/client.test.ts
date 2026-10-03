import { beforeEach, describe, expect, it, vi } from "vitest";
import { getScheduleEvents } from "./client";

describe("LoL Esports client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns schedule events from the API response", async () => {
    const events = [{ id: "event-1", state: "unstarted" }];
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ data: { schedule: { events } } }), { status: 200 }),
    );

    await expect(getScheduleEvents()).resolves.toEqual(events);
    expect(String(fetchMock.mock.calls[0][0])).toContain("getSchedule?hl=en-US");
    expect(fetchMock.mock.calls[0][1]).toEqual(
      expect.objectContaining({ headers: expect.any(Object) }),
    );
  });

  it("throws a useful error when the API fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 503 }));

    await expect(getScheduleEvents()).rejects.toThrow("HTTP 503");
  });
});
