import type { TeamComparison } from "./comparison-data";

type Column = {
  key: keyof TeamComparison;
  label: string;
  description: string;
  format: "percentage" | "decimal" | "text";
};

const columns: Column[] = [
  { key: "winRate", label: "Winrate", description: "Porcentagem de vitórias", format: "percentage" },
  { key: "blueWinRate", label: "Winrate Blue", description: "Porcentagem de vitórias no lado azul", format: "percentage" },
  { key: "redWinRate", label: "Winrate Red", description: "Porcentagem de vitórias no lado vermelho", format: "percentage" },
  { key: "firstBloodRate", label: "1º Abate", description: "Partidas em que o time conseguiu o First Blood", format: "percentage" },
  { key: "firstGrubRate", label: "1º Larva", description: "Partidas em que o time conseguiu a primeira Larva", format: "percentage" },
  { key: "firstHeraldRate", label: "1º Arauto", description: "Partidas em que o time conseguiu o primeiro Arauto", format: "percentage" },
  { key: "firstTowerRate", label: "1ª Torre", description: "Partidas em que o time destruiu a primeira Torre", format: "percentage" },
  { key: "firstDragonRate", label: "1º Dragão", description: "Partidas em que o time conseguiu o primeiro Dragão", format: "percentage" },
  { key: "firstBaronRate", label: "1º Barão", description: "Partidas em que o time conseguiu o primeiro Barão", format: "percentage" },
  { key: "averageGameTime", label: "Tempo médio", description: "Duração média das partidas", format: "text" },
  { key: "averageGold", label: "Ouro médio", description: "Ouro médio por partida", format: "text" },
  { key: "averageKills", label: "Abates", description: "Média de abates por partida", format: "decimal" },
  { key: "averageDeaths", label: "Mortes", description: "Média de mortes por partida", format: "decimal" },
  { key: "averageTowers", label: "Torres", description: "Média de torres destruídas por partida", format: "decimal" },
  { key: "averageDragons", label: "Dragões", description: "Média de Dragões por partida", format: "decimal" },
  { key: "averageBarons", label: "Barões", description: "Média de Barões por partida", format: "decimal" },
];

function formatMetric(value: TeamComparison[keyof TeamComparison], format: Column["format"]) {
  if (format === "percentage" && typeof value === "number") return `${value.toFixed(1)}%`;
  if (format === "decimal" && typeof value === "number") return value.toFixed(1);
  return value;
}

export function TeamComparisonTable({ teams }: { teams: TeamComparison[] }) {
  if (teams.length === 0) {
    return <p className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">Nenhum time encontrado.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1800px] text-sm">
          <caption className="sr-only">Comparativo estatístico dos times do campeonato</caption>
          <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
            <tr>
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Jogos</th>
              {columns.map((column) => (
                <th className="whitespace-nowrap px-4 py-3 font-medium" key={column.key} title={column.description}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {teams.map((team) => (
              <tr className="hover:bg-muted/30" key={team.team}>
                <th className="sticky left-0 z-10 bg-card px-4 py-4 text-left font-semibold text-foreground">{team.team}</th>
                <td className="px-4 py-4 text-muted-foreground">{team.games}</td>
                {columns.map((column) => (
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground" key={column.key}>
                    {formatMetric(team[column.key], column.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
