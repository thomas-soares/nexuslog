import { teams } from "../data/mock-match";
import { TeamAvatar } from "./team-avatar";

function ScoreBox({
  value,
  active = false,
}: {
  value: number;
  active?: boolean;
}) {
  return (
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-xl font-bold rounded border text-center flex items-center justify-center ${
        active
          ? "bg-primary/10 text-primary border-primary/20"
          : "text-muted-foreground border-border"
      }`}
    >
      {value}
    </div>
  );
}

export function MatchSummaryCard() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex-col grid grid-cols-2 items-center bg-muted/50 p-4 space-y-0">
        <div>
          <div className="flex gap-4 items-center">
            <TeamAvatar
              src="https://static.lolesports.com/leagues/1592516184297_LPL-01-FullonDark.png"
              alt="LPL"
              size="h-9 w-9 md:h-14 md:w-14"
            />
            <div>
              <p className="font-semibold leading-none tracking-tight">LPL</p>
              <p className="text-sm text-muted-foreground">League of Legends</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <time className="text-sm">19 Sep, 06:00</time>
          <span className="text-sm text-muted-foreground text-end">MD5</span>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center p-4">
        <div className="flex items-center space-x-4 col-span-1">
          <TeamAvatar src={teams.jdg.image} alt={teams.jdg.name} />
          <div className="flex flex-col">
            <h2 className="font-semibold">{teams.jdg.name}</h2>
            <p className="text-xs text-muted-foreground">
              {teams.jdg.shortName}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <ScoreBox value={teams.jdg.score} />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
              -
            </span>
            <ScoreBox value={teams.ig.score} active />
          </div>
        </div>
        <div className="flex items-center space-x-4 col-span-1 justify-end">
          <div className="flex flex-col items-end">
            <h2 className="font-semibold">{teams.ig.name}</h2>
            <p className="text-xs text-muted-foreground">
              {teams.ig.shortName}
            </p>
          </div>
          <TeamAvatar src={teams.ig.image} alt={teams.ig.name} />
        </div>
      </div>
    </div>
  );
}
