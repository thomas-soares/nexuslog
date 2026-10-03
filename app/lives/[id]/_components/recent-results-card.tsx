import Link from "next/link";
import type { HomeMatch } from "@/lib/lolesports";
import { formatSeriesScore } from "@/lib/lolesports/score";
import { ResultBadge, SidebarCard, TeamAvatar } from "./sidebar-card";

function RecentResultRow({ match }: { match: HomeMatch }) {
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
        <ResultBadge>{formatSeriesScore(match) || "—"}</ResultBadge>
      </div>
    </Link>
  );
}

export function RecentResultsCard({ matches }: { matches: HomeMatch[] }) {
  return (
    <SidebarCard title="Resultados">
      {matches.length > 0 ? (
        matches.map((match) => <RecentResultRow key={match.id} match={match} />)
      ) : (
        <p className="p-4 text-sm text-muted-foreground">Nenhum resultado recente.</p>
      )}
    </SidebarCard>
  );
}
