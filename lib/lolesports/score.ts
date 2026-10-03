import type { HomeMatch } from "./types";

function hasScore(match: HomeMatch) {
  return match.status === "inProgress" || match.teams.some((team) => (team.score ?? 0) > 0);
}

function isMultiGameSeries(match: HomeMatch) {
  return Number(match.format.replace("MD", "")) > 1;
}

export function hasMatchScore(matches: HomeMatch[]) {
  return matches.some(hasScore);
}

export function hasPartialScore(matches: HomeMatch[]) {
  return matches.some((match) => isMultiGameSeries(match) && hasScore(match));
}

export function formatSeriesScore(match: HomeMatch) {
  const [homeTeam, awayTeam] = match.teams;

  if (
    match.status !== "inProgress" &&
    (homeTeam.score ?? 0) === 0 &&
    (awayTeam.score ?? 0) === 0
  ) {
    return "";
  }

  return `${homeTeam.score ?? "—"} - ${awayTeam.score ?? "—"}`;
}
