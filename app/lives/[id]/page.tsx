/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Timer } from "lucide-react";

const IG_JDG_MATCH_ID = "116957100120526836";

const teams = {
  jdg: {
    name: "Beijing JDG Esports",
    shortName: "JDG",
    image: "https://static.lolesports.com/teams/1627457924722_29.png",
    score: 1,
  },
  ig: {
    name: "Invictus Gaming",
    shortName: "IG",
    image: "https://static.lolesports.com/teams/1634762917340_300px-Invictus_Gaming_logo.png",
    score: 3,
  },
};

const games = [
  { number: 1, duration: "34:18", jdgKills: 9, igKills: 17, jdgGold: "58.221", igGold: "65.904", winner: "ig" },
  { number: 2, duration: "31:42", jdgKills: 18, igKills: 10, jdgGold: "62.480", igGold: "55.318", winner: "jdg" },
  { number: 3, duration: "29:56", jdgKills: 7, igKills: 19, jdgGold: "50.772", igGold: "61.440", winner: "ig" },
  { number: 4, duration: "36:09", jdgKills: 11, igKills: 22, jdgGold: "64.108", igGold: "72.593", winner: "ig" },
];

const sideMatches = [
  {
    href: "/lives/116957100120526824",
    teamA: "TOP ESPORTS",
    teamAImage: "https://static.lolesports.com/teams/1592592064571_TopEsportsTES-01-FullonDark.png",
    teamB: "Invictus Gaming",
    teamBImage: teams.ig.image,
    meta: "17 Sep, 06:00",
    format: "MD5",
  },
  {
    href: "/lives/116957100120526830",
    teamA: "Xi'an Team WE",
    teamAImage: "https://static.lolesports.com/teams/1634763008788_220px-Team_WE_logo.png",
    teamB: "Beijing JDG Esports",
    teamBImage: teams.jdg.image,
    meta: "18 Sep, 06:00",
    format: "MD5",
  },
  {
    href: "/lives/116957100120526836",
    teamA: "Beijing JDG Esports",
    teamAImage: teams.jdg.image,
    teamB: "Invictus Gaming",
    teamBImage: teams.ig.image,
    meta: "19 Sep, 06:00",
    format: "MD5",
  },
];

const results = [
  { href: "/lives/116957100120526824", teamA: "TOP ESPORTS", teamB: "Invictus Gaming", score: "3 - 1" },
  { href: "/lives/116957100120526830", teamA: "Xi'an Team WE", teamB: "Beijing JDG Esports", score: "1 - 3" },
  { href: "/lives/116957100120526836", teamA: "Beijing JDG Esports", teamB: "Invictus Gaming", score: "1 - 3" },
];

const players = [
  ["JDG", "Ale", "Renekton", "2/4/5", "302", "13.420", "-640"],
  ["JDG", "Xun", "Wukong", "1/5/7", "226", "11.804", "-1,120"],
  ["JDG", "Scout", "Azir", "4/3/4", "331", "15.229", "+210"],
  ["JDG", "Peyz", "Kai'Sa", "3/5/3", "356", "16.011", "-820"],
  ["JDG", "MISSING", "Rakan", "1/5/8", "41", "7.644", "-410"],
  ["IG", "YSKM", "Gnar", "4/1/9", "318", "15.710", "+640"],
  ["IG", "Tianzhen", "Xin Zhao", "5/2/10", "241", "13.922", "+1,120"],
  ["IG", "Cryin", "Orianna", "6/2/8", "345", "17.118", "-210"],
  ["IG", "Ahn", "Ezreal", "6/3/7", "382", "19.340", "+820"],
  ["IG", "Wink", "Nautilus", "1/3/15", "49", "8.503", "+410"],
];

function TeamAvatar({ src, alt, size = "h-14 w-14" }: { src: string; alt: string; size?: string }) {
  return (
    <span className={`relative flex shrink-0 overflow-hidden bg-secondary p-3 rounded-md ${size}`}>
      <img className="aspect-square h-full w-full object-contain" alt={alt} src={src} />
    </span>
  );
}

function ScoreBox({ value, active = false }: { value: number; active?: boolean }) {
  return (
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-xl font-bold rounded border text-center flex items-center justify-center ${
        active ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground border-border"
      }`}
    >
      {value}
    </div>
  );
}

function ResultBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
      {children}
    </div>
  );
}

function MatchSummaryCard() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex-col grid grid-cols-2 items-center bg-muted/50 p-4 space-y-0">
        <div>
          <div className="flex gap-4 items-center">
            <TeamAvatar
              src="https://static.lolesports.com/leagues/1592516184297_LPL-01-FullonDark.png"
              alt="LPL"
              size="h-9 w-9 md:h-14 md:w-14"
            />
            <div>
              <p className="font-semibold leading-none tracking-tight">LPL</p>
              <p className="text-sm text-muted-foreground">League of Legends</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <time className="text-sm">19 Sep, 06:00</time>
          <span className="text-sm text-muted-foreground text-end">MD5</span>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center p-4">
        <div className="flex items-center space-x-4 col-span-1">
          <TeamAvatar src={teams.jdg.image} alt={teams.jdg.name} />
          <div className="flex flex-col">
            <h2 className="font-semibold">{teams.jdg.name}</h2>
            <p className="text-xs text-muted-foreground">{teams.jdg.shortName}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <ScoreBox value={teams.jdg.score} />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">-</span>
            <ScoreBox value={teams.ig.score} active />
          </div>
        </div>
        <div className="flex items-center space-x-4 col-span-1 justify-end">
          <div className="flex flex-col items-end">
            <h2 className="font-semibold">{teams.ig.name}</h2>
            <p className="text-xs text-muted-foreground">{teams.ig.shortName}</p>
          </div>
          <TeamAvatar src={teams.ig.image} alt={teams.ig.name} />
        </div>
      </div>
    </div>
  );
}

function GameCard({ game }: { game: (typeof games)[number] }) {
  const igWon = game.winner === "ig";

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden mt-4">
      <div className="flex flex-row items-center justify-between bg-muted/50 space-y-0 p-2">
        <div className="flex items-center gap-2">
          <Timer size={16} />
          <time className="text-xs text-muted-foreground">{game.duration}</time>
        </div>
        <div className="flex gap-2">
          <TeamAvatar src={teams.jdg.image} alt={teams.jdg.shortName} size="h-10 w-10 p-2" />
          <div className="flex items-center justify-center gap-1">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent h-10 w-10 px-3">
              {game.jdgKills}
            </div>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent h-10 w-10 px-3">
              {game.igKills}
            </div>
          </div>
          <TeamAvatar src={teams.ig.image} alt={teams.ig.shortName} size="h-10 w-10 p-2" />
        </div>
        <div>
          <div className="inline-flex items-center border py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 rounded-md">
            <div className="flex items-center gap-1.5">
              <span>Finalizada</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-0 py-2 text-sm">
        <div className="grid gap-2">
          <div className="flex justify-between px-4 gap-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-3 text-sm font-semibold flex-row">
                <span>Torres 5</span>
                <span>Baroes 0</span>
                <span>Dragoes 2</span>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-3 text-sm font-semibold flex-row-reverse">
                <span>Torres 9</span>
                <span>Baroes 1</span>
                <span>Dragoes 3</span>
              </div>
            </div>
          </div>
          <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full" />
          <div className="flex items-center gap-4 px-2">
            <div className="flex gap-2">
              <span className="text-muted-foreground">Ouro</span>
              <span className="font-semibold">{game.jdgGold}</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-red-800">
              <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: "translateX(-54%)" }} />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">{game.igGold}</span>
              <span className="text-muted-foreground">Ouro</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1.5 flex flex-row items-center border-t bg-muted/50 p-2">
        <div className="flex justify-between items-center text-xs w-full">
          <div className="flex gap-2 items-center">
            <TeamAvatar src={teams.jdg.image} alt={teams.jdg.shortName} size="h-8 w-8 p-1" />
            <div>
              <p className="font-bold">{teams.jdg.shortName}</p>
              <div className="text-muted-foreground">Lado Azul</div>
            </div>
          </div>
          <ResultBadge>{igWon ? "Derrota" : "Vitoria"}</ResultBadge>
        </div>
      </div>
      <PlayersTable team="JDG" />
      <div className="space-y-1.5 flex flex-row items-center border-t bg-muted/50 p-2">
        <div className="flex justify-between items-center text-xs w-full">
          <div className="flex gap-2 items-center">
            <TeamAvatar src={teams.ig.image} alt={teams.ig.shortName} size="h-8 w-8 p-1" />
            <div>
              <p className="font-bold">{teams.ig.shortName}</p>
              <div className="text-muted-foreground">Lado Vermelho</div>
            </div>
          </div>
          <ResultBadge>{igWon ? "Vitoria" : "Derrota"}</ResultBadge>
        </div>
      </div>
      <PlayersTable team="IG" />
      <div className="flex flex-row items-center border-t bg-muted/50 p-2">
        <div className="text-xs text-muted-foreground">Patch: 16.17.1</div>
      </div>
    </div>
  );
}

function PlayersTable({ team }: { team: "JDG" | "IG" }) {
  return (
    <div className="p-0 text-sm">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm border-t">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {["Jogador", "Items", "CS", "KDA", "Ouro", "+/-"].map((header) => (
                <th
                  key={header}
                  className="h-10 text-left align-middle font-medium text-muted-foreground p-1 first:pl-2 last:pr-2"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {players
              .filter(([playerTeam]) => playerTeam === team)
              .map(([, name, champion, kda, cs, gold, diff]) => (
                <tr key={name} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="align-middle p-1">
                    <div className="flex gap-2">
                      <div className="relative inline-block">
                        <span className="relative flex shrink-0 overflow-hidden w-9 h-9 rounded-sm bg-muted" />
                      </div>
                      <div>
                        <p className="font-bold">{champion}</p>
                        <p className="text-gray-400">{team} {name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle p-1 font-semibold">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="w-8 h-8 bg-muted rounded-sm" />
                      ))}
                    </div>
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">{cs}</td>
                  <td className="align-middle p-1 font-semibold text-center">{kda}</td>
                  <td className="align-middle p-1 font-semibold text-center">{gold}</td>
                  <td className="align-middle p-1 font-semibold">
                    <div
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full justify-center ${
                        diff.startsWith("+")
                          ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          : "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80"
                      }`}
                    >
                      {diff}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SidebarMatch({
  href,
  teamA,
  teamAImage,
  teamB,
  teamBImage,
  meta,
  format,
}: {
  href: string;
  teamA: string;
  teamAImage: string;
  teamB: string;
  teamBImage: string;
  meta: string;
  format: string;
}) {
  return (
    <Link className="grid grid-cols-2 items-center p-4 hover:bg-muted/50" href={href}>
      <div className="grid grid-cols-1 gap-1 text-sm">
        {[{ name: teamA, image: teamAImage }, { name: teamB, image: teamBImage }].map((team) => (
          <div key={team.name} className="flex gap-2 items-center">
            <TeamAvatar src={team.image} alt={team.name} size="h-6 w-6 rounded-md p-1" />
            <p className="text-sm font-medium truncate">{team.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 items-end text-sm">
        <time className="text-sm font-medium">{meta}</time>
        <span className="text-sm text-muted-foreground">{format}</span>
      </div>
    </Link>
  );
}

function SidebarResult({ href, teamA, teamB, score }: { href: string; teamA: string; teamB: string; score: string }) {
  return (
    <Link className="grid grid-cols-2 items-center p-4 hover:bg-muted/50" href={href}>
      <div className="grid grid-cols-1 gap-1 text-sm">
        {[teamA, teamB].map((team) => (
          <div key={team} className="flex gap-2 items-center">
            <span className="relative flex shrink-0 overflow-hidden h-6 w-6 bg-secondary rounded-md p-1" />
            <p className="text-sm font-medium truncate">{team}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 items-end text-sm">
        <ResultBadge>{score}</ResultBadge>
      </div>
    </Link>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="space-y-1.5 flex flex-row items-start bg-muted/50 p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-7">
          <div className="grid gap-1">
            <div className="font-semibold leading-none tracking-tight">{title}</div>
          </div>
        </div>
      </div>
      <div className="p-0 divide-y">{children}</div>
    </div>
  );
}

function DetailsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 min-w-0 container mx-auto px-0">
      <div className="grid flex-1 items-start gap-4 lg:grid-cols-10">
        <div className="flex flex-col gap-2 md:gap-4 lg:col-span-7">
          <MatchSummaryCard />
          <div dir="ltr" data-orientation="horizontal" className="col-span-3">
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
              tabIndex={0}
              data-orientation="horizontal"
            >
              {games.map((game) => (
                <button
                  key={game.number}
                  type="button"
                  role="tab"
                  aria-selected={game.number === 1}
                  data-state={game.number === 1 ? "active" : "inactive"}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                >
                  Jogo {game.number}
                </button>
              ))}
            </div>
            <div
              data-state="active"
              data-orientation="horizontal"
              role="tabpanel"
              tabIndex={0}
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <GameCard game={games[0]} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 lg:col-span-3">
          <SidebarCard title="Partidas">
            {sideMatches.map((match) => (
              <SidebarMatch key={match.href} {...match} />
            ))}
          </SidebarCard>
          <SidebarCard title="Resultados">
            {results.map((result) => (
              <SidebarResult key={result.href} {...result} />
            ))}
          </SidebarCard>
        </div>
      </div>
    </div>
  );
}

export default async function LiveDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id !== IG_JDG_MATCH_ID) {
    return (
      <main className="container flex flex-1 flex-col gap-4 px-4 py-8 md:px-8">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
          <h1 className="text-2xl font-semibold tracking-tight">Detalhes indisponiveis</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta tela de detalhes esta habilitada apenas para o jogo JDG x IG finalizado.
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

  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-4 md:px-8">
      <DetailsPage />
    </main>
  );
}
