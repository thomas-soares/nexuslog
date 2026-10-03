import type { MatchDetailsData } from "@/lib/lolesports/details";
import { TeamAvatar } from "./team-avatar";

function ScoreBox({ value, active = false }: { value: number; active?: boolean }) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-bold sm:h-10 sm:w-10 sm:text-xl ${
        active
          ? "border-primary/20 bg-primary/10 text-primary"
          : "border-border text-muted-foreground"
      }`}
    >
      {value}
    </div>
  );
}

export function MatchSummaryCard({ match }: { match: MatchDetailsData }) {
  const [homeTeam, awayTeam] = match.teams;

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="grid grid-cols-2 items-center bg-muted/50 p-4">
        <div className="flex items-center gap-4">
          <TeamAvatar
            src={match.leagueImage}
            alt={match.leagueName}
            size="h-9 w-9 md:h-14 md:w-14"
          />
          <div>
            <p className="font-semibold leading-none tracking-tight">{match.leagueName}</p>
            <p className="text-sm text-muted-foreground">League of Legends</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm">{`MD${match.bestOf}`}</span>
          <span className="text-sm text-muted-foreground">Partida finalizada</span>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center p-4">
        <div className="col-span-1 flex items-center space-x-4">
          <TeamAvatar src={homeTeam?.image} alt={homeTeam?.name ?? "Home team"} />
          <div className="flex min-w-0 flex-col">
            <h2 className="truncate font-semibold">{homeTeam?.name}</h2>
            <p className="text-xs text-muted-foreground">{homeTeam?.shortName}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <ScoreBox value={homeTeam?.score ?? 0} />
            <span className="text-xs font-semibold text-muted-foreground sm:text-sm">-</span>
            <ScoreBox value={awayTeam?.score ?? 0} active />
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-end space-x-4">
          <div className="flex min-w-0 flex-col items-end">
            <h2 className="truncate font-semibold">{awayTeam?.name}</h2>
            <p className="text-xs text-muted-foreground">{awayTeam?.shortName}</p>
          </div>
          <TeamAvatar src={awayTeam?.image} alt={awayTeam?.name ?? "Away team"} />
        </div>
      </div>
    </div>
  );
}
