import { DISPLAY_TIME_ZONE } from "./config";
import type { HomeMatch, ScheduleEvent } from "./types";

function formatMatchTime(startTime: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: DISPLAY_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(startTime));
}

function formatMatchDate(startTime: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(startTime));
}

function normalizeImageUrl(image: string | undefined) {
  if (!image) {
    return null;
  }

  return image.replace(/^http:\/\//, "https://");
}

export function toHomeMatch(event: ScheduleEvent): HomeMatch | null {
  const match = event.match;
  const teams = match?.teams;
  const startTime = event.startTime;

  if (!match?.id || !startTime || !teams?.[0] || !teams?.[1]) {
    return null;
  }

  return {
    id: match.id,
    href: `/lives/${match.id}`,
    time: formatMatchTime(startTime),
    date: formatMatchDate(startTime),
    teams: [
      {
        name: teams[0].name ?? "TBD",
        image: normalizeImageUrl(teams[0].image),
        score: teams[0].result?.gameWins ?? null,
      },
      {
        name: teams[1].name ?? "TBD",
        image: normalizeImageUrl(teams[1].image),
        score: teams[1].result?.gameWins ?? null,
      },
    ],
    championship: event.league?.name ?? "LoL Esports",
    stage: event.blockName ?? event.state ?? "-",
    format: `MD${match.strategy?.count ?? 1}`,
    status: event.state ?? "unstarted",
  };
}
