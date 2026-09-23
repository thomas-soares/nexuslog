import { LOL_ESPORTS_API_KEY, PERSISTED_API_URL } from "./config";
import type { ScheduleEvent, ScheduleResponse } from "./types";

export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
  const url = new URL(`${PERSISTED_API_URL}/getSchedule`);
  url.searchParams.set("hl", "en-US");

  const response = await fetch(url, {
    headers: {
      "x-api-key": LOL_ESPORTS_API_KEY,
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`LoL Esports API responded with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as ScheduleResponse;
  return payload.data?.schedule?.events ?? [];
}
