/* eslint-disable @next/next/no-img-element */
import { Timer } from "lucide-react";
import { championImageUrl } from "@/lib/datadragon/urls";
import {
  bans,
  mockMatchPatchVersion,
  teams,
  type Game,
} from "../data/mock-match";
import { DragonList } from "./dragon-list";
import { ObjectiveStat } from "./objective-stat";
import { PlayersTable, teamKda } from "./players-table";
import { ResultBadge } from "./result-badge";
import { TeamAvatar } from "./team-avatar";

export function GameCard({ game }: { game: Game }) {
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
              src={championImageUrl(champion.championId, mockMatchPatchVersion)}
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
              src={championImageUrl(champion.championId, mockMatchPatchVersion)}
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
        <div className="text-xs text-muted-foreground">
          Patch: {mockMatchPatchVersion}
        </div>
      </div>
    </div>
  );
}
