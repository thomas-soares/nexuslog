/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Timer } from "lucide-react";
import { MatchesSidebar, ResultsSidebar } from "./match-sidebar-widgets";

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
    image:
      "https://static.lolesports.com/teams/1634762917340_300px-Invictus_Gaming_logo.png",
    score: 3,
  },
};

const games = [
  {
    number: 1,
    duration: "34:18",
    jdgKills: 9,
    igKills: 17,
    jdgGold: "58.221",
    igGold: "65.904",
    winner: "ig",
  },
  {
    number: 2,
    duration: "31:42",
    jdgKills: 18,
    igKills: 10,
    jdgGold: "62.480",
    igGold: "55.318",
    winner: "jdg",
  },
  {
    number: 3,
    duration: "29:56",
    jdgKills: 7,
    igKills: 19,
    jdgGold: "50.772",
    igGold: "61.440",
    winner: "ig",
  },
  {
    number: 4,
    duration: "36:09",
    jdgKills: 11,
    igKills: 22,
    jdgGold: "64.108",
    igGold: "72.593",
    winner: "ig",
  },
];

const players = [
  {
    team: "JDG",
    name: "Ale",
    champion: "Renekton",
    championId: "Renekton",
    kda: "2/4/5",
    cs: "302",
    gold: "13.420",
    damage: "16.842",
    diff: "-640",
    items: ["6631", "3071", "3047", "3053", "3156", "3364"],
  },
  {
    team: "JDG",
    name: "Xun",
    champion: "Wukong",
    championId: "MonkeyKing",
    kda: "1/5/7",
    cs: "226",
    gold: "11.804",
    damage: "9.518",
    diff: "-1,120",
    items: ["6695", "3078", "3111", "3026", "3156", "3364"],
  },
  {
    team: "JDG",
    name: "Scout",
    champion: "Azir",
    championId: "Azir",
    kda: "4/3/4",
    cs: "331",
    gold: "15.229",
    damage: "24.901",
    diff: "+210",
    items: ["6655", "3089", "3157", "3020", "3135", "3363"],
  },
  {
    team: "JDG",
    name: "Peyz",
    champion: "Kai'Sa",
    championId: "Kaisa",
    kda: "3/5/3",
    cs: "356",
    gold: "16.011",
    damage: "21.774",
    diff: "-820",
    items: ["3031", "3124", "3085", "3006", "3036", "3363"],
  },
  {
    team: "JDG",
    name: "MISSING",
    champion: "Rakan",
    championId: "Rakan",
    kda: "1/5/8",
    cs: "41",
    gold: "7.644",
    damage: "4.208",
    diff: "-410",
    items: ["2065", "3222", "3109", "3158", "2055", "3364"],
  },
  {
    team: "IG",
    name: "YSKM",
    champion: "Gnar",
    championId: "Gnar",
    kda: "4/1/9",
    cs: "318",
    gold: "15.710",
    damage: "19.306",
    diff: "+640",
    items: ["3078", "3748", "3047", "6333", "3053", "3364"],
  },
  {
    team: "IG",
    name: "Tianzhen",
    champion: "Xin Zhao",
    championId: "XinZhao",
    kda: "5/2/10",
    cs: "241",
    gold: "13.922",
    damage: "14.603",
    diff: "+1,120",
    items: ["3748", "3155", "3111", "3071", "3026", "3364"],
  },
  {
    team: "IG",
    name: "Cryin",
    champion: "Orianna",
    championId: "Orianna",
    kda: "6/2/8",
    cs: "345",
    gold: "17.118",
    damage: "28.441",
    diff: "-210",
    items: ["6655", "3089", "3157", "3020", "4645", "3363"],
  },
  {
    team: "IG",
    name: "Ahn",
    champion: "Ezreal",
    championId: "Ezreal",
    kda: "6/3/7",
    cs: "382",
    gold: "19.340",
    damage: "31.982",
    diff: "+820",
    items: ["6694", "3161", "3158", "3078", "3036", "3363"],
  },
  {
    team: "IG",
    name: "Wink",
    champion: "Nautilus",
    championId: "Nautilus",
    kda: "1/3/15",
    cs: "49",
    gold: "8.503",
    damage: "6.170",
    diff: "+410",
    items: ["2065", "3109", "3860", "3190", "2055", "3364"],
  },
];

const bans = {
  jdg: [
    { name: "Cassiopeia", championId: "Cassiopeia" },
    { name: "Nocturne", championId: "Nocturne" },
    { name: "Vi", championId: "Vi" },
    { name: "Ryze", championId: "Ryze" },
    { name: "Camille", championId: "Camille" },
  ],
  ig: [
    { name: "Corki", championId: "Corki" },
    { name: "Vi", championId: "Vi" },
    { name: "Rell", championId: "Rell" },
    { name: "Kalista", championId: "Kalista" },
    { name: "Jayce", championId: "Jayce" },
  ],
};

function championImageUrl(championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/16.17.1/img/champion/${championId}.png`;
}

function itemImageUrl(itemId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/16.17.1/img/item/${itemId}.png`;
}

function dragonImageUrl(type: string) {
  return `/images/dragons/dragon-${type}.svg`;
}

function teamKda(team: "JDG" | "IG") {
  const totals = players
    .filter((player) => player.team === team)
    .reduce(
      (acc, player) => {
        const [kills, deaths, assists] = player.kda.split("/").map(Number);

        return {
          kills: acc.kills + kills,
          deaths: acc.deaths + deaths,
          assists: acc.assists + assists,
        };
      },
      { kills: 0, deaths: 0, assists: 0 },
    );

  return `${totals.kills}/${totals.deaths}/${totals.assists}`;
}

function TeamAvatar({
  src,
  alt,
  size = "h-14 w-14",
}: {
  src: string;
  alt: string;
  size?: string;
}) {
  return (
    <span
      className={`relative flex shrink-0 overflow-hidden bg-secondary p-3 rounded-md ${size}`}
    >
      <img
        className="aspect-square h-full w-full object-contain"
        alt={alt}
        src={src}
      />
    </span>
  );
}

function ScoreBox({
  value,
  active = false,
}: {
  value: number;
  active?: boolean;
}) {
  return (
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-xl font-bold rounded border text-center flex items-center justify-center ${
        active
          ? "bg-primary/10 text-primary border-primary/20"
          : "text-muted-foreground border-border"
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

function DragonList({
  dragons,
  align = "left",
}: {
  dragons: string[];
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex min-w-[96px] gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      {dragons.map((dragon, index) => (
        <img
          key={`${dragon}-${index}`}
          alt={dragon}
          width="19"
          height="19"
          src={dragonImageUrl(dragon)}
        />
      ))}
    </div>
  );
}

type ObjectiveIconName = "inhibitor" | "baron" | "turret" | "dragon" | "herald" | "voidgrub";

const objectiveIconPaths: Record<ObjectiveIconName, string> = {
  inhibitor:
    "M16 1.333C7.9 1.333 1.333 7.9 1.333 16S7.9 30.667 16 30.667 30.667 24.1 30.667 16C30.65 7.9 24.1 1.35 16 1.333zM16 27C9.917 27 5 22.083 5 16S9.917 5 16 5s11 4.917 11 11c0 6.067-4.933 11-11 11zm0-4.333L9.333 16 16 9.333 22.667 16 16 22.667z",
  baron:
    "M17,12.5049 C17,13.3299 16.331,13.9999 15.504,13.9999 L15.496,13.9999 C14.669,13.9999 14,13.3299 14,12.5049 L14,12.4949 C14,11.6699 14.669,10.9999 15.496,10.9999 L15.504,10.9999 C16.331,10.9999 17,11.6699 17,12.4949 L17,12.5049 Z M13,10.0079 C13,10.5559 12.556,10.9999 12.008,10.9999 L11.992,10.9999 C11.444,10.9999 11,10.5559 11,10.0079 L11,9.9919 C11,9.4439 11.444,8.9999 11.992,8.9999 L12.008,8.9999 C12.556,8.9999 13,9.4439 13,9.9919 L13,10.0079 Z M13,15.0099 C13,15.5569 12.557,15.9999 12.01,15.9999 L11.99,15.9999 C11.443,15.9999 11,15.5569 11,15.0099 L11,14.9899 C11,14.4429 11.443,13.9999 11.99,13.9999 L12.01,13.9999 C12.557,13.9999 13,14.4429 13,14.9899 L13,15.0099 Z M10,12.5139 C10,13.3349 9.334,13.9999 8.514,13.9999 L8.486,13.9999 C7.666,13.9999 7,13.3349 7,12.5139 L7,12.4859 C7,11.6659 7.666,10.9999 8.486,10.9999 L8.514,10.9999 C9.334,10.9999 10,11.6659 10,12.4859 L10,12.5139 Z M22,5.9999 L15,1.9999 L15,3.9999 L18,6.9999 L16,8.9999 L12,4.9999 L8,8.9999 L6,6.9999 L9,3.9999 L9,1.9999 L2,5.9999 L6,10.9999 L2,14.9999 L5,18.9999 L5,14.9999 L7,14.9999 L8,19.9999 L10,21.9999 L10,17.9999 L12,19.9999 L14,17.9999 L14,21.9999 L16,19.9999 L17,14.9999 L19,14.9999 L19,18.9999 L22,14.9999 L18,10.9999 L22,5.9999 Z",
  turret:
    "m16 19.667 9.333-9H22l1.667-1.833L16 1.334l-7.667 7.5L10 10.667H6.667l9.333 9zm0-15.334 4.167 4.333L16 12.833l-4.167-4.167L16 4.333zM9.333 15.667l3.333 15h6.667l3.333-15-6.689 6.485-6.644-6.485z",
  dragon:
    "M24.617 10.25V2.817L18.817 8 15.7 1.333 12.583 8 6.8 2.817v7.433H1.333l6.05 4.95v5.067c0 .967.4 2.217 1.117 2.883l6.35 7.017c.3.317.7.5 1.15.5s.85-.183 1.15-.5l6.367-7.017c.717-.667 1.117-1.9 1.117-2.883V15.2l6.033-4.95h-6.05zM13.9 19.917c-3.767.9-4.9-6.25-4.9-6.25 6.9 3.917 4.9 6.25 4.9 6.25zm4.083 0S16.5 17.217 23 13.5c0 0-1.133 7.333-5.017 6.417z",
  herald:
    "M25 19.333c.003.075.001.146-.001.218-.002.09-.005.182.001.282 0 2.755-3.224 5.308-5.833 7.167-.951.608-2.016.85-3.167.833-1.09-.016-2.266-.258-3.167-.833C10.224 25.141 7 22.588 7 19.833v-.5L3.333 17.5c0-6.518 7.167-14.167 7.167-14.167v7.472c1.513-1.178 3.58-1.902 5.5-1.972s3.487.794 5 1.972V3.333s7.667 7.649 7.667 14.167L25 19.333zm-7.477 4.054c1.684-1.111 4.171-3.037 4.143-4.704 0-6.578-5.652-6.517-5.652-6.517s-5.681-.062-5.681 6.517c0 1.667 2.476 3.581 4.171 4.704a2.774 2.774 0 0 0 3.018 0zM5.167 21l-3.833 3.667c1.576 1.787 6 4 6 4C5.592 25.682 5.167 21 5.167 21zm25.5 3.667c-1.576 1.787-6 4-6 4C26.409 25.682 26.834 21 26.834 21l3.833 3.667zM18.11 17.33l-1.338-1.919c-.168-.256-.457-.411-.767-.411s-.599.155-.767.411l-1.361 1.919c-.291.417-.28.97.028 1.375l1.361 1.754a.915.915 0 0 0 1.478 0l1.366-1.754a1.172 1.172 0 0 0 0-1.375z",
  voidgrub:
    "M25 19.333c.003.075.001.146-.001.218-.002.09-.005.182.001.282 0 2.755-3.224 5.308-5.833 7.167-.951.608-2.016.85-3.167.833-1.09-.016-2.266-.258-3.167-.833C10.224 25.141 7 22.588 7 19.833v-.5L3.333 17.5c0-6.518 7.167-14.167 7.167-14.167v7.472c1.513-1.178 3.58-1.902 5.5-1.972s3.487.794 5 1.972V3.333s7.667 7.649 7.667 14.167L25 19.333zm-7.477 4.054c1.684-1.111 4.171-3.037 4.143-4.704 0-6.578-5.652-6.517-5.652-6.517s-5.681-.062-5.681 6.517c0 1.667 2.476 3.581 4.171 4.704a2.774 2.774 0 0 0 3.018 0zM5.167 21l-3.833 3.667c1.576 1.787 6 4 6 4C5.592 25.682 5.167 21 5.167 21zm25.5 3.667c-1.576 1.787-6 4-6 4C26.409 25.682 26.834 21 26.834 21l3.833 3.667zM18.11 17.33l-1.338-1.919c-.168-.256-.457-.411-.767-.411s-.599.155-.767.411l-1.361 1.919c-.291.417-.28.97.028 1.375l1.361 1.754a.915.915 0 0 0 1.478 0l1.366-1.754a1.172 1.172 0 0 0 0-1.375z",
};

const objectiveIconViewBox: Record<ObjectiveIconName, string> = {
  inhibitor: "0 0 32 32",
  baron: "0 0 24 24",
  turret: "0 0 32 32",
  dragon: "0 0 32 32",
  herald: "0 0 32 32",
  voidgrub: "0 0 32 32",
};

function ObjectiveIcon({ name, side }: { name: ObjectiveIconName; side: "blue" | "red" }) {
  const color = side === "blue" ? "#2747E8" : "#CB2124";

  return (
    <svg
      aria-label={name}
      className="h-[19px] w-[19px]"
      style={{ color }}
      viewBox={objectiveIconViewBox[name]}
      fill="none"
    >
      <path fill="currentColor" d={objectiveIconPaths[name]} />
    </svg>
  );
}

function ObjectiveStat({
  count,
  icon,
  side,
}: {
  count: number;
  icon: ObjectiveIconName;
  side: "blue" | "red";
}) {
  return (
    <span
      className={`flex items-center gap-1 ${side === "red" ? "flex-row-reverse" : "flex-row"}`}
    >
      <span>{count}</span>
      <ObjectiveIcon name={icon} side={side} />
    </span>
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
            <p className="text-xs text-muted-foreground">
              {teams.jdg.shortName}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <ScoreBox value={teams.jdg.score} />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
              -
            </span>
            <ScoreBox value={teams.ig.score} active />
          </div>
        </div>
        <div className="flex items-center space-x-4 col-span-1 justify-end">
          <div className="flex flex-col items-end">
            <h2 className="font-semibold">{teams.ig.name}</h2>
            <p className="text-xs text-muted-foreground">
              {teams.ig.shortName}
            </p>
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
          <TeamAvatar
            src={teams.jdg.image}
            alt={teams.jdg.shortName}
            size="h-10 w-10 p-2"
          />
          <div className="flex items-center justify-center gap-1">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent h-10 w-10 px-3">
              {game.jdgKills}
            </div>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent h-10 w-10 px-3">
              {game.igKills}
            </div>
          </div>
          <TeamAvatar
            src={teams.ig.image}
            alt={teams.ig.shortName}
            size="h-10 w-10 p-2"
          />
        </div>
        <div>
          <div className="inline-flex items-center border py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 rounded-md">
            <div className="flex items-center gap-1.5">
              <span>Finalizada</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex gap-1">
          {bans.jdg.map((champion) => (
            <img
              key={champion.name}
              alt={champion.name}
              loading="lazy"
              width="32"
              height="32"
              decoding="async"
              className="grayscale"
              src={championImageUrl(champion.championId)}
            />
          ))}
        </div>
        <div className="text-sm">Bans</div>
        <div className="flex gap-1">
          {bans.ig.map((champion) => (
            <img
              key={champion.name}
              alt={champion.name}
              loading="lazy"
              width="32"
              height="32"
              decoding="async"
              className="grayscale"
              src={championImageUrl(champion.championId)}
            />
          ))}
        </div>
      </div>
      <div className="p-0 py-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4 px-4 text-sm font-semibold">
            <DragonList dragons={["cloud"]} />
            <div className="flex flex-1 items-center justify-center gap-4">
              <ObjectiveStat count={0} icon="inhibitor" side="blue" />
              <ObjectiveStat count={0} icon="baron" side="blue" />
              <ObjectiveStat count={5} icon="turret" side="blue" />
              <ObjectiveStat count={9} icon="turret" side="red" />
              <ObjectiveStat count={1} icon="baron" side="red" />
              <ObjectiveStat count={2} icon="inhibitor" side="red" />
            </div>
            <DragonList dragons={["hextech", "ocean", "cloud"]} align="right" />
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full"
          />
          <div className="flex items-center gap-4 px-4">
            <div className="flex gap-2 whitespace-nowrap">
              <span>KDA</span>
              <span className="font-semibold">{teamKda("JDG")}</span>
              <span className="text-muted-foreground">Ouro</span>
              <span className="font-semibold">{game.jdgGold}</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-red-800">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: "42%" }}
              />
            </div>
            <div className="flex gap-2 whitespace-nowrap">
              <span className="font-semibold">{game.igGold}</span>
              <span className="text-muted-foreground">Ouro</span>
              <span className="font-semibold">{teamKda("IG")}</span>
              <span>KDA</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1.5 flex flex-row items-center border-t bg-muted/50 p-2">
        <div className="flex justify-between items-center text-xs w-full">
          <div className="flex gap-2 items-center">
            <TeamAvatar
              src={teams.jdg.image}
              alt={teams.jdg.shortName}
              size="h-8 w-8 p-1"
            />
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
            <TeamAvatar
              src={teams.ig.image}
              alt={teams.ig.shortName}
              size="h-8 w-8 p-1"
            />
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
              {["Jogador", "Items", "CS", "KDA", "Ouro", "Dano", "+/-"].map(
                (header) => (
                  <th
                    key={header}
                    className="h-10 text-left align-middle font-medium text-muted-foreground p-1 first:pl-2 last:pr-2"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {players
              .filter((player) => player.team === team)
              .map((player) => (
                <tr
                  key={player.name}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="align-middle p-1">
                    <div className="flex gap-2">
                      <div className="relative inline-block">
                        <span className="relative flex shrink-0 overflow-hidden w-9 h-9 rounded-sm">
                          <img
                            className="aspect-square h-full w-full object-contain"
                            alt={player.champion}
                            src={championImageUrl(player.championId)}
                          />
                        </span>
                      </div>
                      <div>
                        <p className="font-bold">{player.champion}</p>
                        <p className="text-gray-400">
                          {team} {player.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle p-1 font-semibold">
                    <div className="flex items-center space-x-1">
                      {player.items.map((itemId) => (
                        <img
                          key={itemId}
                          alt={itemId}
                          width="32"
                          height="32"
                          className="h-8 w-8 rounded-sm"
                          src={itemImageUrl(itemId)}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.cs}
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.kda}
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.gold}
                  </td>
                  <td className="align-middle p-1 font-semibold text-center">
                    {player.damage}
                  </td>
                  <td className="align-middle p-1 font-semibold">
                    <div
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full justify-center ${
                        player.diff.startsWith("+")
                          ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          : "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80"
                      }`}
                    >
                      {player.diff}
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
          <MatchesSidebar />
          <ResultsSidebar />
        </div>
      </div>
    </div>
  );
}

export default async function LiveDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id !== IG_JDG_MATCH_ID) {
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

  return (
    <main className="container flex flex-1 flex-col gap-4 px-4 py-4 md:px-8">
      <DetailsPage />
    </main>
  );
}
