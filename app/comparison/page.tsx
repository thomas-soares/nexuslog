import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { comparisonChampionship, comparisonTeams } from "./comparison-data";
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

export default function ComparisonPage() {
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
          <label className="flex max-w-sm flex-col gap-2 text-sm font-medium" htmlFor="championship">
            Campeonato
            <select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal" defaultValue={comparisonChampionship} id="championship">
              <option value={comparisonChampionship}>{comparisonChampionship}</option>
            </select>
          </label>
          <TeamComparisonTable teams={comparisonTeams} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
