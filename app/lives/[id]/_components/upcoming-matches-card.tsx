import Link from "next/link";
import type { HomeMatch } from "@/lib/lolesports";
import { LiveStatus } from "../../../_components/live-status";
import { SidebarCard, TeamAvatar } from "./sidebar-card";

function UpcomingMatchRow({ match }: { match: HomeMatch }) {
  const isLive = match.status === "inProgress";

  return (
    <Link className="grid grid-cols-2 items-center p-4 hover:bg-muted/50" href={match.href}>
      <div className="grid grid-cols-1 gap-1 text-sm">
        {match.teams.map((team) => (
          <div key={team.name} className="flex items-center gap-2">
            <TeamAvatar src={team.image ?? undefined} alt={team.name} />
            <p className="truncate text-sm font-medium">{team.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end gap-1 text-sm">
        {isLive ? (
          <LiveStatus />
        ) : (
          <time className="text-sm font-medium">
            {match.date.replace(/,\s+\d{4}$/, "")}, {match.time}
          </time>
        )}
        <span className="text-sm text-muted-foreground">{match.format}</span>
      </div>
    </Link>
  );
}

export function UpcomingMatchesCard({ matches }: { matches: HomeMatch[] }) {
  return (
    <SidebarCard title="Partidas">
      {matches.length > 0 ? (
        matches.map((match) => <UpcomingMatchRow key={match.id} match={match} />)
      ) : (
        <p className="p-4 text-sm text-muted-foreground">Nenhuma partida próxima.</p>
      )}
    </SidebarCard>
  );
}
