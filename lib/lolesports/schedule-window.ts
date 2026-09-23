export const UPCOMING_GRACE_PERIOD_MS = 60 * 60 * 1000;

export function isWithinUpcomingWindow(startTime: string, now = Date.now()) {
  const startsAt = new Date(startTime).getTime();

  return now <= startsAt + UPCOMING_GRACE_PERIOD_MS;
}
