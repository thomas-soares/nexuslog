import type { HomeMatch } from "./types";

export function hasPartialScore(matches: HomeMatch[]) {
  return matches.some(
    (match) =>
      match.status === "inProgress" ||
      match.teams.some((team) => (team.score ?? 0) > 0),
  );
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
