type Team = {
  name: string;
  mark: string;
  tone: string;
};

type Match = {
  time: string;
  teams: [Team, Team];
  championship: string;
  stage: string;
  date: string;
  format: string;
};

const matches: Match[] = [
  {
    time: "12:00",
    teams: [
      { name: "BOMBA Team", mark: "B", tone: "bg-[#f5f0de] text-black" },
      { name: "Solary", mark: "S", tone: "bg-[#f2f5f6] text-[#d3b44a]" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 10, 2026",
    format: "MD3",
  },
  {
    time: "15:00",
    teams: [
      { name: "Heretics Academy", mark: "H", tone: "bg-[#1f1f1f] text-white" },
      { name: "Karmine Corp Blue", mark: "K", tone: "bg-[#f2f2f2] text-white" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 10, 2026",
    format: "MD3",
  },
  {
    time: "15:00",
    teams: [
      { name: "PCIFIC Esports", mark: "P", tone: "bg-[#eef9fb] text-[#1fb7d8]" },
      { name: "Forsaken", mark: "F", tone: "bg-[#f0f0f0] text-white" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 10, 2026",
    format: "MD3",
  },
  {
    time: "15:00",
    teams: [
      { name: "WLGaming", mark: "W", tone: "bg-[#fff0f3] text-[#f24b70]" },
      { name: "Galions", mark: "G", tone: "bg-[#f2f2f2] text-white" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 10, 2026",
    format: "MD3",
  },
  {
    time: "15:00",
    teams: [
      { name: "Eintracht Spandau", mark: "E", tone: "bg-[#eef0f2] text-[#c54242]" },
      { name: "Anubis Gaming", mark: "A", tone: "bg-[#f0eeee] text-[#8a111c]" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 10, 2026",
    format: "MD3",
  },
  {
    time: "07:00",
    teams: [
      { name: "Saigon Warrior", mark: "S", tone: "bg-[#f7ece7] text-[#86351c]" },
      { name: "TP.HCM SN CyberCore Esports", mark: "T", tone: "bg-[#eef4f7] text-[#83a8bb]" },
    ],
    championship: "VCS",
    stage: "Playoffs",
    date: "Jun 11, 2026",
    format: "MD5",
  },
  {
    time: "12:00",
    teams: [
      { name: "Eintracht Spandau", mark: "E", tone: "bg-[#eef0f2] text-[#c54242]" },
      { name: "Solary", mark: "S", tone: "bg-[#f2f5f6] text-[#d3b44a]" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 11, 2026",
    format: "MD3",
  },
  {
    time: "12:00",
    teams: [
      { name: "BOMBA Team", mark: "B", tone: "bg-[#f5f0de] text-black" },
      { name: "Anubis Gaming", mark: "A", tone: "bg-[#f0eeee] text-[#8a111c]" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 11, 2026",
    format: "MD3",
  },
  {
    time: "12:00",
    teams: [
      { name: "MISA Esports", mark: "M", tone: "bg-[#fff8e8] text-[#f1c246]" },
      { name: "UCAM Esports Club", mark: "U", tone: "bg-[#eff5f2] text-[#121212]" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 11, 2026",
    format: "MD3",
  },
  {
    time: "12:00",
    teams: [
      { name: "Galions", mark: "G", tone: "bg-[#f2f2f2] text-white" },
      { name: "G2 NORD", mark: "G", tone: "bg-[#f0f0f0] text-white" },
    ],
    championship: "EMEA Masters",
    stage: "Groups",
    date: "Jun 11, 2026",
    format: "MD3",
  },
];

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

function FeedbackIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-[1.2rem] w-[1.2rem]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2m-15.66 5.66-1.41 1.41M19.07 4.93l-1.41 1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron({ direction }: { direction: "first" | "previous" | "next" | "last" }) {
  const paths = {
    first: "m11 17-5-5 5-5M18 17l-5-5 5-5",
    previous: "m15 18-6-6 6-6",
    next: "m9 18 6-6-6-6",
    last: "m6 17 5-5-5-5M13 17l5-5-5-5",
  };

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[direction]} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamRow({ team }: { team: Team }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm font-normal leading-5 text-foreground">
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full p-1 text-[9px] font-semibold ${team.tone}`}>
        {team.mark}
      </span>
      <p className="truncate">{team.name}</p>
    </div>
  );
}

export default function Home() {
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
              <FeedbackIcon />
              Feedback
            </button>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <SunIcon />
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
                              {matches.map((match, index) => (
                                <tr
                                  key={`${match.teams[0].name}-${match.teams[1].name}-${index}`}
                                  className="border-b transition-colors hover:bg-muted/50"
                                >
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
                                    <button className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium leading-none text-foreground shadow-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                      Assistir
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                          <div className="flex w-[100px] items-center justify-center text-sm font-medium leading-5 text-foreground">
                            Pagina 1 de 8
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="hidden h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground opacity-50 ring-offset-background transition-colors lg:flex" disabled>
                              <span className="sr-only">Go to first page</span>
                              <Chevron direction="first" />
                            </button>
                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground opacity-50 ring-offset-background transition-colors" disabled>
                              <span className="sr-only">Go to previous page</span>
                              <Chevron direction="previous" />
                            </button>
                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
                              <span className="sr-only">Go to next page</span>
                              <Chevron direction="next" />
                            </button>
                            <button className="hidden h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-0 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground lg:flex">
                              <span className="sr-only">Go to last page</span>
                              <Chevron direction="last" />
                            </button>
                          </div>
                        </div>
                      </div>
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
