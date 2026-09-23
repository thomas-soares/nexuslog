import Link from "next/link";
import { LiveDetails } from "./_components/live-details";
import { IG_JDG_MATCH_ID } from "./data/mock-match";

function DetailsUnavailable() {
  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:px-8">
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
        <h1 className="text-2xl font-semibold tracking-tight">
          Detalhes indisponiveis
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta tela de detalhes esta habilitada apenas para o jogo JDG x IG
          finalizado.
        </p>
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

export default async function LiveDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id !== IG_JDG_MATCH_ID) {
    return <DetailsUnavailable />;
  }

  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-4 md:px-8">
      <LiveDetails />
    </main>
  );
}
