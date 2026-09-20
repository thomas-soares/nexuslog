/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";

const teamImages = {
  jdg: "https://static.lolesports.com/teams/1627457924722_29.png",
  ig: "https://static.lolesports.com/teams/1634762917340_300px-Invictus_Gaming_logo.png",
};

const sideMatches = [
  {
    href: "/lives/116957100120526824",
    teamA: "TOP ESPORTS",
    teamAImage:
      "https://static.lolesports.com/teams/1592592064571_TopEsportsTES-01-FullonDark.png",
    teamB: "Invictus Gaming",
    teamBImage: teamImages.ig,
    meta: "17 Sep, 06:00",
    format: "MD5",
  },
  {
    href: "/lives/116957100120526830",
    teamA: "Xi'an Team WE",
    teamAImage:
      "https://static.lolesports.com/teams/1634763008788_220px-Team_WE_logo.png",
    teamB: "Beijing JDG Esports",
    teamBImage: teamImages.jdg,
    meta: "18 Sep, 06:00",
    format: "MD5",
  },
  {
    href: "/lives/116957100120526836",
    teamA: "Beijing JDG Esports",
    teamAImage: teamImages.jdg,
    teamB: "Invictus Gaming",
    teamBImage: teamImages.ig,
    meta: "19 Sep, 06:00",
    format: "MD5",
  },
];

const results = [
  {
    href: "/lives/116957100120526824",
    teamA: "TOP ESPORTS",
    teamB: "Invictus Gaming",
    score: "3 - 1",
  },
  {
    href: "/lives/116957100120526830",
    teamA: "Xi'an Team WE",
    teamB: "Beijing JDG Esports",
    score: "1 - 3",
  },
  {
    href: "/lives/116957100120526836",
    teamA: "Beijing JDG Esports",
    teamB: "Invictus Gaming",
    score: "1 - 3",
  },
];

function TeamAvatar({
  src,
  alt,
  size = "h-6 w-6 rounded-md p-1",
}: {
  src?: string;
  alt: string;
  size?: string;
}) {
  return (
    <span className={`relative flex shrink-0 overflow-hidden bg-secondary ${size}`}>
      {src ? (
        <img
          className="aspect-square h-full w-full object-contain"
          alt={alt}
          src={src}
        />
      ) : null}
    </span>
  );
}

function ResultBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      {children}
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: ReactNode }) {
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
    <Link
      className="grid grid-cols-2 items-center p-4 hover:bg-muted/50"
      href={href}
    >
      <div className="grid grid-cols-1 gap-1 text-sm">
        {[
          { name: teamA, image: teamAImage },
          { name: teamB, image: teamBImage },
        ].map((team) => (
          <div key={team.name} className="flex gap-2 items-center">
            <TeamAvatar src={team.image} alt={team.name} />
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

function SidebarResult({
  href,
  teamA,
  teamB,
  score,
}: {
  href: string;
  teamA: string;
  teamB: string;
  score: string;
}) {
  return (
    <Link
      className="grid grid-cols-2 items-center p-4 hover:bg-muted/50"
      href={href}
    >
      <div className="grid grid-cols-1 gap-1 text-sm">
        {[teamA, teamB].map((team) => (
          <div key={team} className="flex gap-2 items-center">
            <TeamAvatar alt={team} />
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

export function MatchesSidebar() {
  return (
    <SidebarCard title="Partidas">
      {sideMatches.map((match) => (
        <SidebarMatch key={match.href} {...match} />
      ))}
    </SidebarCard>
  );
}

export function ResultsSidebar() {
  return (
    <SidebarCard title="Resultados">
      {results.map((result) => (
        <SidebarResult key={result.href} {...result} />
      ))}
    </SidebarCard>
  );
}
