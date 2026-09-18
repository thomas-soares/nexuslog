import { getUpcomingMatches, type HomeMatch } from "@/lib/lolesports";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MessageSquare,
  Sun,
} from "lucide-react";

export const dynamic = "force-dynamic";

function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute left-[37%] top-[8%] h-[82%] w-[26%] rounded-sm bg-foreground" />
      <div className="absolute left-[8%] top-[37%] h-[26%] w-[82%] rounded-sm bg-foreground" />
      <div className="absolute left-[52%] top-[20%] h-[26%] w-[26%] rounded-full border-[3px] border-background bg-foreground" />
      <div className="absolute left-[20%] top-[52%] h-[26%] w-[26%] rounded-full border-[3px] border-background bg-foreground" />
    </div>
  );
}

function TeamLogo({ team }: { team: HomeMatch["teams"][number] }) {
  return (
    <span className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full bg-secondary p-1">
      {team.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="aspect-square h-full w-full object-contain" alt={team.name} src={team.image} />
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

function MatchTable({ matches }: { matches: HomeMatch[] }) {
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
        <table className="w-full caption-bottom text-sm text-foreground">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              {["Hora", "Partida", "Campeonato", "Data", "Detalhes"].map((heading) => (
                <th
                  key={heading}
                  className="h-12 px-4 text-left align-middle text-sm font-medium leading-5 text-muted-foreground"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {matches.map((match) => (
              <tr key={match.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-md border border-input bg-background px-2 py-1 text-xs font-semibold leading-4 text-foreground">
                    <time className="font-medium">{match.time}</time>
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex min-w-[260px] flex-col gap-1">
                    <TeamRow team={match.teams[0]} />
                    <TeamRow team={match.teams[1]} />
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex flex-col gap-1 text-sm font-normal leading-5 text-foreground">
                    <p>{match.championship}</p>
                    <span className="text-muted-foreground">{match.stage}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex flex-col gap-1 text-sm font-normal leading-5 text-foreground">
                    <time>{match.date}</time>
                    <span className="text-muted-foreground">{match.format}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <a
                    className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium leading-none text-foreground shadow-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    href={match.href}
                  >
                    Assistir
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium leading-5 text-foreground">
          Pagina 1 de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="hidden h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground opacity-50 ring-offset-background transition-colors lg:flex"
            disabled
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground opacity-50 ring-offset-background transition-colors"
            disabled
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
            disabled={totalPages <= 1}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            className="hidden h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground lg:flex"
            disabled={totalPages <= 1}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const { matches, error } = await getUpcomingMatches(10);
  const totalPages = Math.max(1, Math.ceil(matches.length / 10));

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a className="flex items-center gap-2 text-lg font-semibold leading-none text-foreground md:text-base" href="#">
            <BrandMark className="h-6 w-6" />
            <span>NexusLog</span>
          </a>
          <nav className="relative z-10 hidden max-w-max flex-1 items-center justify-center lg:flex">
            <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
              <li>
                <a
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium leading-none text-foreground transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
                >
                  Ao vivo
                </a>
              </li>
            </ul>
          </nav>
        </nav>

        <div className="flex gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="flex items-center space-x-4">
            <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium leading-none text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <MessageSquare className="mr-2 h-4 w-4" />
              Feedback
            </button>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </button>
        </div>
      </header>

      <main className="container flex flex-1 flex-col gap-4 px-4 md:gap-8 md:px-8">
        <div className="flex flex-col gap-4 pt-4 sm:pt-8 md:gap-8">
          <div>
            <h1 className="text-2xl font-bold leading-8 tracking-tight text-foreground">NexusLog HUB</h1>
            <p className="text-base font-normal leading-6 text-muted-foreground">HUB de conteudo competitivo</p>
          </div>

          <div>
            <div className="xl:col-span-3">
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-background px-3 py-1.5 text-sm font-medium leading-5 text-foreground shadow-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Próximas
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium leading-5 text-muted-foreground ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Recentes
                </button>
              </div>

              <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
                      <div className="grid gap-1">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight text-foreground">Jogos ao vivo</h3>
                        <p className="text-sm font-normal leading-5 text-muted-foreground">
                          Veja aos jogos de LoL que estão rolando ao vivo
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="space-y-4">
                      {error ? (
                        <div className="rounded-md border border-destructive/50 p-4 text-sm text-destructive">
                          {error}
                        </div>
                      ) : (
                        <>
                          <MatchTable matches={matches} />
                          <Pagination totalPages={totalPages} />
                        </>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 border-t bg-background py-6 sm:mt-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0 md:px-6">
          <a className="flex items-center gap-2 text-lg font-semibold leading-none text-foreground" href="#">
            <BrandMark className="h-6 w-6" />
            <span className="sr-only">NexusLog HUB</span>
          </a>
          <p className="text-balance text-center text-sm font-normal leading-loose text-muted-foreground md:text-left">
            © 2024 NexusLog HUB. Todos os direitos reservados.
          </p>
          <nav className="flex items-center gap-4 text-sm font-medium leading-5">
            <a className="text-muted-foreground transition-colors hover:text-foreground hover:underline" href="#">
              Política de Privacidade
            </a>
            <a className="text-muted-foreground transition-colors hover:text-foreground hover:underline" href="#">
              Termos de Serviço
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
