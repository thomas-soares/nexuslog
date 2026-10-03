/* eslint-disable @next/next/no-img-element */
import { championImageUrl, itemImageUrl } from "@/lib/datadragon/urls";
import type { MatchDetailPlayer } from "@/lib/lolesports/details";

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function teamKda(players: MatchDetailPlayer[], teamId: string) {
  const totals = players
    .filter((player) => player.teamId === teamId)
    .reduce(
      (acc, player) => ({
        kills: acc.kills + player.kills,
        deaths: acc.deaths + player.deaths,
        assists: acc.assists + player.assists,
      }),
      { kills: 0, deaths: 0, assists: 0 },
    );

  return `${totals.kills}/${totals.deaths}/${totals.assists}`;
}

export function PlayersTable({
  teamId,
  teamName,
  players,
  patchVersion,
}: {
  teamId: string;
  teamName: string;
  players: MatchDetailPlayer[];
  patchVersion: string;
}) {
  return (
    <div className="p-0 text-sm">
      <div className="relative w-full overflow-auto">
        <table className="w-full border-t text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              {["Jogador", "Items", "CS", "KDA", "Ouro", "Dano", "+/-"].map((header) => (
                <th key={header} className="h-10 p-1 text-left align-middle font-medium text-muted-foreground first:pl-2 last:pr-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {players
              .filter((player) => player.teamId === teamId)
              .map((player) => (
                <tr key={player.name} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-1 align-middle">
                    <div className="flex gap-2">
                      <span className="relative inline-block h-9 w-9 shrink-0 overflow-hidden rounded-sm">
                        <img
                          className="aspect-square h-full w-full object-contain"
                          alt={player.champion}
                          src={championImageUrl(player.championId, patchVersion)}
                        />
                      </span>
                      <div>
                        <p className="font-bold">{player.champion}</p>
                        <p className="text-gray-400">{teamName} {player.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-1 align-middle font-semibold">
                    <div className="flex items-center space-x-1">
                      {player.items.map((itemId, itemIndex) => (
                        <img
                          key={`${itemId}-${itemIndex}`}
                          alt={itemId}
                          width="32"
                          height="32"
                          className="h-8 w-8 rounded-sm"
                          src={itemImageUrl(itemId, patchVersion)}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-1 text-center align-middle font-semibold">{formatNumber(player.cs)}</td>
                  <td className="p-1 text-center align-middle font-semibold">
                    {player.kills}/{player.deaths}/{player.assists}
                  </td>
                  <td className="p-1 text-center align-middle font-semibold">{formatNumber(player.gold)}</td>
                  <td className="p-1 text-center align-middle font-semibold">
                    {player.damageShare === null ? "—" : `${player.damageShare}%`}
                  </td>
                  <td className="p-1 align-middle font-semibold">
                    <div
                      className={`inline-flex w-full items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                        player.diff >= 0
                          ? "border-transparent bg-secondary text-secondary-foreground"
                          : "border-transparent bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {player.diff > 0 ? "+" : ""}{formatNumber(player.diff)}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
