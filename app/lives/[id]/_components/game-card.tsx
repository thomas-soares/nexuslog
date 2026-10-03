import { Timer } from "lucide-react";
import type {
  MatchDetailGame,
  MatchDetailsData,
} from "@/lib/lolesports/details";
import { DragonList } from "./dragon-list";
import { ObjectiveStat } from "./objective-stat";
import { PlayersTable, teamKda } from "./players-table";
import { ResultBadge } from "./result-badge";
import { TeamAvatar } from "./team-avatar";

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function GameCard({ game, match }: { game: MatchDetailGame; match: MatchDetailsData }) {
  const blue = game.teams.find((team) => team.side === "blue");
  const red = game.teams.find((team) => team.side === "red");
  const blueTeam = match.teams.find((team) => team.id === blue?.teamId);
  const redTeam = match.teams.find((team) => team.id === red?.teamId);
  const totalGold = (blue?.gold ?? 0) + (red?.gold ?? 0);
  const blueGoldWidth = totalGold > 0 ? `${((blue?.gold ?? 0) / totalGold) * 100}%` : "50%";

  return (
    <div className="mt-4 overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between bg-muted/50 p-2">
        <div className="flex items-center gap-2">
          <Timer size={16} />
          <time className="text-xs text-muted-foreground">{game.duration}</time>
        </div>
        <div className="flex gap-2">
          <TeamAvatar src={blueTeam?.image} alt={blueTeam?.shortName ?? "Blue"} size="h-10 w-10 p-2" />
          <div className="flex items-center justify-center gap-1">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium">
              {blue?.kills ?? 0}
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium">
              {red?.kills ?? 0}
            </div>
          </div>
          <TeamAvatar src={redTeam?.image} alt={redTeam?.shortName ?? "Red"} size="h-10 w-10 p-2" />
        </div>
        <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-foreground">
          {game.state === "finished" || game.state === "completed" ? "Finalizada" : game.state}
        </div>
      </div>

      <div className="flex items-center justify-center border-b px-4 py-3 text-sm text-muted-foreground">
        Bans indisponíveis
      </div>

      <div className="grid gap-2 p-2 text-sm">
        <div className="flex items-center justify-between gap-4 px-2 font-semibold">
          <DragonList dragons={blue?.dragons ?? []} />
          <div className="flex flex-1 items-center justify-center gap-4">
            <ObjectiveStat count={blue?.inhibitors ?? 0} icon="inhibitor" side="blue" />
            <ObjectiveStat count={blue?.barons ?? 0} icon="baron" side="blue" />
            <ObjectiveStat count={blue?.towers ?? 0} icon="turret" side="blue" />
            <ObjectiveStat count={red?.towers ?? 0} icon="turret" side="red" />
            <ObjectiveStat count={red?.barons ?? 0} icon="baron" side="red" />
            <ObjectiveStat count={red?.inhibitors ?? 0} icon="inhibitor" side="red" />
          </div>
          <DragonList dragons={red?.dragons ?? []} align="right" />
        </div>
        <div className="h-px w-full shrink-0 bg-border" />
        <div className="flex items-center gap-4 px-2">
          <div className="flex gap-2 whitespace-nowrap">
            <span>KDA</span>
            <span className="font-semibold">{teamKda(game.players, blue?.teamId ?? "")}</span>
            <span className="text-muted-foreground">Ouro</span>
            <span className="font-semibold">{formatNumber(blue?.gold ?? 0)}</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-red-800">
            <div className="h-full bg-green-500 transition-all" style={{ width: blueGoldWidth }} />
          </div>
          <div className="flex gap-2 whitespace-nowrap">
            <span className="font-semibold">{formatNumber(red?.gold ?? 0)}</span>
            <span className="text-muted-foreground">Ouro</span>
            <span className="font-semibold">{teamKda(game.players, red?.teamId ?? "")}</span>
            <span>KDA</span>
          </div>
        </div>
      </div>

      {[blue, red].map((gameTeam) => {
        if (!gameTeam) return null;
        const team = match.teams.find((candidate) => candidate.id === gameTeam.teamId);
        const won = game.winnerTeamId === gameTeam.teamId;

        return (
          <div key={gameTeam.teamId}>
            <div className="flex items-center border-t bg-muted/50 p-2">
              <div className="flex w-full items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TeamAvatar src={team?.image} alt={team?.shortName ?? team?.name ?? "Team"} size="h-8 w-8 p-1" />
                  <div>
                    <p className="font-bold">{team?.shortName ?? team?.name}</p>
                    <div className="text-muted-foreground">Lado {gameTeam.side === "blue" ? "Azul" : "Vermelho"}</div>
                  </div>
                </div>
                <ResultBadge>{won ? "Vitória" : "Derrota"}</ResultBadge>
              </div>
            </div>
            <PlayersTable
              teamId={gameTeam.teamId}
              teamName={team?.shortName ?? team?.name ?? "Team"}
              players={game.players}
              patchVersion={match.patchVersion}
            />
          </div>
        );
      })}

      <div className="flex flex-row items-center border-t bg-muted/50 p-2">
        <div className="text-xs text-muted-foreground">Patch: {match.patchVersion}</div>
      </div>
    </div>
  );
}
