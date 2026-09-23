/* eslint-disable @next/next/no-img-element */
import { championImageUrl, itemImageUrl } from "@/lib/datadragon/urls";
import { mockMatchPatchVersion, players, type PlayerTeam } from "../data/mock-match";

export function teamKda(team: PlayerTeam) {
  const totals = players
    .filter((player) => player.team === team)
    .reduce(
      (acc, player) => {
        const [kills, deaths, assists] = player.kda.split("/").map(Number);

        return {
          kills: acc.kills + kills,
          deaths: acc.deaths + deaths,
          assists: acc.assists + assists,
        };
      },
      { kills: 0, deaths: 0, assists: 0 },
    );

  return `${totals.kills}/${totals.deaths}/${totals.assists}`;
}

export function PlayersTable({ team }: { team: PlayerTeam }) {
  return (
    <div className="p-0 text-sm">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm border-t">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {["Jogador", "Items", "CS", "KDA", "Ouro", "Dano", "+/-"].map(
                (header) => (
                  <th
                    key={header}
                    className="h-10 text-left align-middle font-medium text-muted-foreground p-1 first:pl-2 last:pr-2"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {players
              .filter((player) => player.team === team)
              .map((player) => (
                <tr
                  key={player.name}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="align-middle p-1">
                    <div className="flex gap-2">
                      <div className="relative inline-block">
                        <span className="relative flex shrink-0 overflow-hidden w-9 h-9 rounded-sm">
                          <img
                            className="aspect-square h-full w-full object-contain"
                            alt={player.champion}
                            src={championImageUrl(player.championId, mockMatchPatchVersion)}
                          />
                        </span>
                      </div>
                      <div>
                        <p className="font-bold">{player.champion}</p>
                        <p className="text-gray-400">
                          {team} {player.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle p-1 font-semibold">
                    <div className="flex items-center space-x-1">
                      {player.items.map((itemId) => (
                        <img
                          key={itemId}
                          alt={itemId}
                          width="32"
                          height="32"
                          className="h-8 w-8 rounded-sm"
                          src={itemImageUrl(itemId, mockMatchPatchVersion)}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.cs}
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.kda}
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.gold}
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.damage}
                  </td>
                  <td className="align-middle p-1 font-semibold">
                    <div
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full justify-center ${
                        player.diff.startsWith("+")
                          ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          : "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80"
                      }`}
                    >
                      {player.diff}
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
