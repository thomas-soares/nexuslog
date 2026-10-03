import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { comparisonTournaments, getComparisonTournament } from "./comparison-data";
import { TeamComparisonTable } from "./team-comparison-table";

function ComparisonBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link className="inline-flex items-center gap-1 hover:text-foreground" href="/">
        <Home className="h-4 w-4" />
        <span>Início</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">Comparativo</span>
    </nav>
  );
}

export default async function ComparisonPage({
  searchParams,
}: {
  searchParams?: Promise<{ tournament?: string | string[] }>;
}) {
  const query = await searchParams;
  const tournamentId = Array.isArray(query?.tournament) ? query.tournament[0] : query?.tournament;
  const tournament = getComparisonTournament(tournamentId);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="container flex flex-1 flex-col gap-6 px-4 py-4 md:px-8 md:py-8">
        <ComparisonBreadcrumb />
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Comparativo de times</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">Compare o desempenho dos times no campeonato selecionado.</p>
        </section>
        <section className="flex flex-col gap-4">
          <form className="flex flex-col items-start gap-2 sm:flex-row sm:items-end" method="get">
            <label className="flex w-full max-w-sm flex-col gap-2 text-sm font-medium" htmlFor="tournament">
              Campeonato
              <select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal" defaultValue={tournament.id} id="tournament" name="tournament">
                {comparisonTournaments.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
              </select>
            </label>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground" type="submit">
              Aplicar
            </button>
          </form>
          <TeamComparisonTable teams={tournament.teams} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
