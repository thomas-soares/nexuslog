import { getScheduleEvents } from "./client";
import { toHomeMatch } from "./mappers";
import {
  isCompletedSeries,
  isFullyCompletedSeries,
  isInProgressSeries,
} from "./series";
import type { HomeMatch, HomeMatchesResult } from "./types";

function isHomeMatch(match: HomeMatch | null): match is HomeMatch {
  return Boolean(match);
}

function toErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to load matches.";
}

export async function getUpcomingMatches(limit = 10): Promise<HomeMatchesResult> {
  try {
    const now = Date.now();
    const events = await getScheduleEvents();

    const matches = events
      .filter((event) => event.match && event.startTime && !isCompletedSeries(event))
      .filter((event) => {
        const startsAt = new Date(event.startTime as string).getTime();

        return isInProgressSeries(event) || startsAt >= now;
      })
      .sort((a, b) => {
        const aLive = isInProgressSeries(a);
        const bLive = isInProgressSeries(b);

        if (aLive !== bLive) {
          return aLive ? -1 : 1;
        }

        return new Date(a.startTime as string).getTime() - new Date(b.startTime as string).getTime();
      })
      .map((event) => {
        if (isInProgressSeries(event)) {
          return {
            ...event,
            state: "inProgress",
          };
        }

        return event;
      })
      .map(toHomeMatch)
      .filter(isHomeMatch)
      .slice(0, limit);

    return {
      matches,
      error: null,
    };
  } catch (error) {
    return {
      matches: [],
      error: toErrorMessage(error),
    };
  }
}

export async function getRecentMatches(limit = 10): Promise<HomeMatchesResult> {
  try {
    const now = Date.now();
    const events = await getScheduleEvents();

    const matches = events
      .filter((event) => event.match && event.startTime)
      .filter((event) => new Date(event.startTime as string).getTime() < now)
      .filter(isFullyCompletedSeries)
      .sort(
        (a, b) =>
          new Date(b.startTime as string).getTime() - new Date(a.startTime as string).getTime(),
      )
      .map(toHomeMatch)
      .filter(isHomeMatch)
      .slice(0, limit);

    return {
      matches,
      error: null,
    };
  } catch (error) {
    return {
      matches: [],
      error: toErrorMessage(error),
    };
  }
}
