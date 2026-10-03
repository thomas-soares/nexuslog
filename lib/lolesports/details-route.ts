export function isValidMatchId(matchId: string) {
  return /^\d+$/.test(matchId);
}
