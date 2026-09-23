import type { ScheduleEvent } from "./types";

function getNeededWins(bestOf: number) {
  return Math.ceil(bestOf / 2);
}

export function isCompletedSeries(event: ScheduleEvent) {
  const bestOf = event.match?.strategy?.count ?? 1;
  const neededWins = getNeededWins(bestOf);

  return (
    event.state === "completed" ||
    event.match?.teams?.some((team) => (team.result?.gameWins ?? 0) >= neededWins) ||
    false
  );
}

export function isFullyCompletedSeries(event: ScheduleEvent) {
  return event.state === "completed";
}

function hasSeriesStarted(event: ScheduleEvent) {
  return event.match?.teams?.some((team) => (team.result?.gameWins ?? 0) > 0) ?? false;
}

export function isInProgressSeries(event: ScheduleEvent) {
  return event.state === "inProgress" || (hasSeriesStarted(event) && !isCompletedSeries(event));
}
