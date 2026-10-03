import type { TeamComparison } from "./comparison-data";

const columns: Array<{ key: keyof TeamComparison; label: string }> = [
  { key: "winRate", label: "Winrate" },
  { key: "blueWinRate", label: "Winrate Blue" },
  { key: "redWinRate", label: "Winrate Red" },
  { key: "averageGameTime", label: "Tempo médio" },
  { key: "firstBloodRate", label: "1º Abate" },
  { key: "firstHeraldRate", label: "1º Arauto" },
  { key: "firstTowerRate", label: "1º Torre" },
  { key: "firstDragonRate", label: "1º Dragão" },
  { key: "firstBaronRate", label: "1º Barão" },
  { key: "averageGold", label: "Ouro médio" },
];

function formatMetric(value: TeamComparison[keyof TeamComparison]) {
  return typeof value === "number" ? `${value.toFixed(1)}%` : value;
}

export function TeamComparisonTable({ teams }: { teams: TeamComparison[] }) {
  if (teams.length === 0) {
    return <p className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">Nenhum time encontrado.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
            <tr>
              <th className="sticky left-0 bg-muted/50 px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Jogos</th>
              {columns.map((column) => <th className="px-4 py-3 font-medium" key={column.key}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y">
            {teams.map((team) => (
              <tr className="hover:bg-muted/30" key={team.team}>
                <th className="sticky left-0 bg-card px-4 py-4 text-left font-semibold text-foreground">{team.team}</th>
                <td className="px-4 py-4 text-muted-foreground">{team.games}</td>
                {columns.map((column) => <td className="px-4 py-4 text-muted-foreground" key={column.key}>{formatMetric(team[column.key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
