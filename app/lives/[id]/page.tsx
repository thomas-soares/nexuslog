import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getMatchDetails } from "@/lib/lolesports/details";
import { isValidMatchId } from "@/lib/lolesports/details-route";
import { SiteHeader } from "../../_components/site-header";
import { LiveDetails } from "./_components/live-details";

function DetailsUnavailable({ message }: { message: string }) {
  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:px-8">
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
        <h1 className="text-2xl font-semibold tracking-tight">Detalhes indisponíveis</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Link
          className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          href="/"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}

function MatchBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link className="inline-flex items-center gap-1 hover:text-foreground" href="/">
        <Home className="h-4 w-4" />
        <span>Início</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">Detalhes da partida</span>
    </nav>
  );
}

export default async function LiveDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isValidMatchId(id)) {
    return <DetailsUnavailable message="O ID da partida é inválido." />;
  }

  let match;

  try {
    match = await getMatchDetails(id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível carregar esta partida.";

    return <DetailsUnavailable message={message} />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="container flex flex-1 flex-col gap-4 px-4 py-4 md:px-8">
        <MatchBreadcrumb />
        <LiveDetails match={match} />
      </main>
    </div>
  );
}
