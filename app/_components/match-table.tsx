/* eslint-disable @next/next/no-img-element */
import type { HomeMatch } from "@/lib/lolesports";

function TeamLogo({ team }: { team: HomeMatch["teams"][number] }) {
  return (
    <span className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full bg-secondary p-1">
      {team.image ? (
        <img
          className="aspect-square h-full w-full object-contain"
          alt={team.name}
          src={team.image}
        />
      ) : (
        <span className="grid h-full w-full place-items-center text-[9px] font-semibold text-secondary-foreground">
          {team.name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

function TeamRow({ team }: { team: HomeMatch["teams"][number] }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm font-normal leading-5 text-foreground">
      <TeamLogo team={team} />
      <p className="truncate">{team.name}</p>
    </div>
  );
}

function ScoreBadge({ match }: { match: HomeMatch }) {
  const homeScore = match.teams[0].score ?? 0;
  const awayScore = match.teams[1].score ?? 0;

  return (
    <div className="flex flex-col items-start gap-1 text-sm">
      <div className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        {homeScore} - {awayScore}
      </div>
    </div>
  );
}

function MatchAction({ match, label = "Assistir" }: { match: HomeMatch; label?: string }) {
  const isLive = match.status === "inProgress";

  if (isLive) {
    return (
      <a
        className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        href={match.href}
      >
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden="true" />
          <span>Ao vivo</span>
        </span>
      </a>
    );
  }

  return (
    <a
      className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      href={match.href}
    >
      {label}
    </a>
  );
}

export function MatchTable({
  matches,
  showScore = false,
  showDetails = false,
  showLiveStatus = false,
  detailsLabel = "Assistir",
}: {
  matches: HomeMatch[];
  showScore?: boolean;
  showDetails?: boolean;
  showLiveStatus?: boolean;
  detailsLabel?: string;
}) {
  const shouldShowLiveStatus =
    showLiveStatus && matches.some((match) => match.status === "inProgress");

  if (matches.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        Nenhuma partida encontrada no momento.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {[
                "Hora",
                "Partida",
                ...(showScore ? ["Resultado"] : []),
                "Campeonato",
                "Data",
                ...(shouldShowLiveStatus ? ["Status"] : []),
                ...(showDetails ? ["Detalhes"] : []),
              ].map((heading) => (
                <th
                  key={heading}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                >
                  <div>{heading}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {matches.map((match) => (
              <tr
                key={match.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                data-state="false"
              >
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <span className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <time className="font-medium">{match.time}</time>
                  </span>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex min-w-[260px] flex-col gap-1">
                    <TeamRow team={match.teams[0]} />
                    <TeamRow team={match.teams[1]} />
                  </div>
                </td>
                {showScore ? (
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <ScoreBadge match={match} />
                  </td>
                ) : null}
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex flex-col gap-1 text-sm">
                    <p>{match.championship}</p>
                    <span className="hidden text-muted-foreground md:inline">
                      {match.stage}
                    </span>
                  </div>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex flex-col gap-1 text-sm">
                    <time>{match.date}</time>
                    <span className="hidden text-muted-foreground md:inline">
                      {match.format}
                    </span>
                  </div>
                </td>
                {shouldShowLiveStatus ? (
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {match.status === "inProgress" ? <MatchAction match={match} /> : null}
                  </td>
                ) : null}
                {showDetails ? (
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <MatchAction match={match} label={detailsLabel} />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
