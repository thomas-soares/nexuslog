export function formatPlayerLabel(teamName: string, playerName: string) {
  const team = teamName.trim();
  const player = playerName.trim();

  if (!team || !player) {
    return team || player;
  }

  return player.toLocaleLowerCase().startsWith(`${team.toLocaleLowerCase()} `)
    ? player
    : `${team} ${player}`;
}
