import { LOL_ESPORTS_API_KEY, PERSISTED_API_URL } from "./config";

const LIVE_STATS_API_URL = "https://feed.lolesports.com/livestats/v1";

type RawTeam = {
  id?: string;
  name?: string;
  code?: string;
  image?: string;
  result?: { gameWins?: number };
};

type RawGame = {
  number?: number;
  id?: string;
  state?: string;
  teams?: Array<{ id?: string; side?: "blue" | "red" }>;
  vods?: Array<{ startMillis?: number; endMillis?: number }>;
};

type RawEvent = {
  league?: { name?: string; image?: string };
  tournament?: { id?: string };
  match?: {
    strategy?: { count?: number };
    teams?: RawTeam[];
    games?: RawGame[] | RawGame;
  };
};

type FeedParticipant = {
  participantId?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  creepScore?: number;
  totalGold?: number;
};

type FeedTeam = {
  totalGold?: number;
  totalKills?: number;
  towers?: number;
  inhibitors?: number;
  barons?: number;
  dragons?: string[];
  participants?: FeedParticipant[];
};

type WindowFrame = {
  rfc460Timestamp?: string;
  gameState?: string;
  blueTeam?: FeedTeam;
  redTeam?: FeedTeam;
};

type MetadataParticipant = {
  participantId?: number;
  summonerName?: string;
  championId?: string;
  role?: string;
};

type GameMetadata = {
  patchVersion?: string;
  blueTeamMetadata?: {
    esportsTeamId?: string;
    participantMetadata?: MetadataParticipant[];
  };
  redTeamMetadata?: {
    esportsTeamId?: string;
    participantMetadata?: MetadataParticipant[];
  };
};

type DetailsParticipant = {
  participantId?: number;
  totalGoldEarned?: number;
  items?: number[];
  championDamageShare?: number;
};

type DetailsFrame = {
  participants?: DetailsParticipant[];
};

export type MatchDetailTeam = {
  id: string;
  name: string;
  shortName: string;
  image: string | null;
  score: number;
};

export type MatchDetailPlayer = {
  teamId: string;
  name: string;
  role: string;
  champion: string;
  championId: string;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  gold: number;
  damageShare: number | null;
  diff: number;
  items: string[];
};

export type MatchDetailGameTeam = {
  teamId: string;
  side: "blue" | "red";
  kills: number;
  gold: number;
  towers: number;
  inhibitors: number;
  barons: number;
  dragons: string[];
};

export type MatchDetailGame = {
  id: string;
  number: number;
  state: string;
  duration: string;
  winnerTeamId: string | null;
  teams: MatchDetailGameTeam[];
  players: MatchDetailPlayer[];
};

export type MatchDetailsData = {
  leagueName: string;
  leagueImage: string | null;
  bestOf: number;
  teams: MatchDetailTeam[];
  games: MatchDetailGame[];
  patchVersion: string;
};

export type MatchFeedBundle = {
  gameId: string;
  startedAt?: string;
  window: WindowFrame | null;
  metadata: GameMetadata | null;
  details: DetailsFrame | null;
};

function asArray<T>(value: T[] | T | undefined) {
  return value ? (Array.isArray(value) ? value : [value]) : [];
}

function playedGames(games: RawGame[] | RawGame | undefined) {
  return asArray(games).filter((game) => game.state !== "unneeded" && game.state !== "unstarted");
}

function normalizeImageUrl(image: string | undefined) {
  return image ? image.replace(/^http:\/\//, "https://") : null;
}

function formatPatchVersion(version: string | undefined) {
  if (!version) {
    return "—";
  }

  return `${version.split(".").slice(0, 2).join(".")}.1`;
}

function formatDuration(startMillis: number | undefined, endMillis: number | undefined) {
  if (startMillis === undefined || endMillis === undefined || endMillis <= startMillis) {
    return "—";
  }

  const totalSeconds = Math.floor((endMillis - startMillis) / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function formatTimestampDuration(startTimestamp: string | undefined, endTimestamp: string | undefined) {
  if (!startTimestamp || !endTimestamp) {
    return "—";
  }

  return formatDuration(Date.parse(startTimestamp), Date.parse(endTimestamp));
}

function formatDamageShare(value: number | undefined) {
  return value === undefined ? null : Math.round(value * 100);
}

function formatFeedStartingTime(date: Date) {
  date.setSeconds(Math.floor(date.getSeconds() / 10) * 10, 0);
  return date.toISOString();
}

function teamFrame(frame: WindowFrame | null, side: "blue" | "red") {
  return side === "blue" ? frame?.blueTeam : frame?.redTeam;
}

function metadataParticipants(metadata: GameMetadata | null, side: "blue" | "red") {
  return side === "blue"
    ? metadata?.blueTeamMetadata?.participantMetadata ?? []
    : metadata?.redTeamMetadata?.participantMetadata ?? [];
}

function findParticipant<T extends { participantId?: number }>(
  participants: T[] | undefined,
  participantId: number | undefined,
) {
  return participants?.find((participant) => participant.participantId === participantId);
}

function mapPlayers(
  frame: WindowFrame | null,
  metadata: GameMetadata | null,
  details: DetailsFrame | null,
  teams: MatchDetailGameTeam[],
) {
  const players = teams.flatMap((team) => {
    const teamFrameData = teamFrame(frame, team.side);
    const frameParticipants = teamFrameData?.participants ?? [];
    const metadataPlayers = metadataParticipants(metadata, team.side);

    return metadataPlayers.map((metadataPlayer) => {
      const framePlayer = findParticipant(frameParticipants, metadataPlayer.participantId);
      const detailsPlayer = findParticipant(details?.participants, metadataPlayer.participantId);

      return {
        teamId: team.teamId,
        name: metadataPlayer.summonerName ?? "Unknown",
        role: metadataPlayer.role ?? "",
        champion: metadataPlayer.championId ?? "Unknown",
        championId: metadataPlayer.championId ?? "",
        kills: framePlayer?.kills ?? 0,
        deaths: framePlayer?.deaths ?? 0,
        assists: framePlayer?.assists ?? 0,
        cs: framePlayer?.creepScore ?? 0,
        gold: detailsPlayer?.totalGoldEarned ?? framePlayer?.totalGold ?? 0,
        damageShare: formatDamageShare(detailsPlayer?.championDamageShare),
        diff: 0,
        items: (detailsPlayer?.items ?? []).map(String),
      } satisfies MatchDetailPlayer;
    });
  });

  return players.map((player) => {
    const opponent = players.find(
      (candidate) => candidate.teamId !== player.teamId && candidate.role === player.role,
    );

    return {
      ...player,
      diff: player.gold - (opponent?.gold ?? player.gold),
    };
  });
}

export function mapMatchDetails(event: RawEvent, feeds: MatchFeedBundle[]): MatchDetailsData {
  const rawTeams = event.match?.teams ?? [];
  const teams = rawTeams.slice(0, 2).map((team) => ({
    id: team.id ?? "",
    name: team.name ?? "Unknown",
    shortName: team.code ?? team.name ?? "",
    image: normalizeImageUrl(team.image),
    score: team.result?.gameWins ?? 0,
  }));

  const games = playedGames(event.match?.games).flatMap((game) => {
    if (!game.id) {
      return [];
    }

    const feed = feeds.find((candidate) => candidate.gameId === game.id);
    const gameTeams = (game.teams ?? []).flatMap((gameTeam) => {
      if (!gameTeam.id || (gameTeam.side !== "blue" && gameTeam.side !== "red")) {
        return [];
      }

      const data = teamFrame(feed?.window ?? null, gameTeam.side);

      return [{
        teamId: gameTeam.id,
        side: gameTeam.side,
        kills: data?.totalKills ?? 0,
        gold: data?.totalGold ?? 0,
        towers: data?.towers ?? 0,
        inhibitors: data?.inhibitors ?? 0,
        barons: data?.barons ?? 0,
        dragons: data?.dragons ?? [],
      } satisfies MatchDetailGameTeam];
    });

    const winner = [...gameTeams].sort((a, b) => b.kills - a.kills)[0];

    return [{
      id: game.id,
      number: game.number ?? 0,
      state: game.state ?? feed?.window?.gameState ?? "unknown",
      duration:
        formatDuration(game.vods?.[0]?.startMillis, game.vods?.[0]?.endMillis) !== "—"
          ? formatDuration(game.vods?.[0]?.startMillis, game.vods?.[0]?.endMillis)
          : formatTimestampDuration(feed?.startedAt, feed?.window?.rfc460Timestamp),
      winnerTeamId: winner && winner.kills > 0 ? winner.teamId : null,
      teams: gameTeams,
      players: mapPlayers(feed?.window ?? null, feed?.metadata ?? null, feed?.details ?? null, gameTeams),
    } satisfies MatchDetailGame];
  });

  return {
    leagueName: event.league?.name ?? "LoL Esports",
    leagueImage: normalizeImageUrl(event.league?.image),
    bestOf: event.match?.strategy?.count ?? 1,
    teams,
    games,
    patchVersion: formatPatchVersion(feeds.find((feed) => feed.metadata?.patchVersion)?.metadata?.patchVersion),
  };
}

async function fetchJson<T>(url: string, headers?: HeadersInit) {
  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`LoL Esports API responded with HTTP ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function fetchJsonOrNull<T>(url: string) {
  try {
    return await fetchJson<T>(url);
  } catch {
    return null;
  }
}

async function fetchGameFeed(gameId: string, gameState: string | undefined): Promise<MatchFeedBundle> {
  const [initialWindowPayload, initialDetailsPayload] = await Promise.all([
    fetchJsonOrNull<{ gameMetadata?: GameMetadata; frames?: WindowFrame[] }>(
      `${LIVE_STATS_API_URL}/window/${gameId}`,
    ),
    fetchJsonOrNull<{ frames?: DetailsFrame[] }>(`${LIVE_STATS_API_URL}/details/${gameId}`),
  ]);
  const initialTimestamp = initialWindowPayload?.frames?.at(-1)?.rfc460Timestamp;
  const startingTime = formatFeedStartingTime(
    gameState === "completed" && initialTimestamp
      ? new Date(Date.parse(initialTimestamp) + 2 * 60 * 60 * 1000)
      : new Date(),
  );

  const fetchWithFallback = <T,>(path: string, initialPayload: T | null) =>
    fetchJson<T>(
      `${LIVE_STATS_API_URL}/${path}/${gameId}?startingTime=${encodeURIComponent(startingTime)}`,
    ).catch(() => initialPayload);

  const [windowPayload, detailsPayload] = await Promise.all([
    fetchWithFallback("window", initialWindowPayload),
    fetchWithFallback("details", initialDetailsPayload),
  ]);

  return {
    gameId,
    startedAt: initialTimestamp,
    window: windowPayload?.frames?.at(-1) ?? null,
    metadata: windowPayload?.gameMetadata ?? null,
    details: detailsPayload?.frames?.at(-1) ?? null,
  };
}

export async function getMatchDetails(matchId: string) {
  const url = new URL(`${PERSISTED_API_URL}/getEventDetails`);
  url.searchParams.set("hl", "en-US");
  url.searchParams.set("id", matchId);

  const payload = await fetchJson<{ data?: { event?: RawEvent } }>(url.toString(), {
    "x-api-key": LOL_ESPORTS_API_KEY,
    Accept: "application/json",
  });
  const event = payload.data?.event;

  if (!event?.match) {
    throw new Error("Match details are unavailable.");
  }

  const games = playedGames(event.match.games);
  const feeds = await Promise.all(
    games
      .filter((game): game is RawGame & { id: string } => Boolean(game.id))
      .map((game) => fetchGameFeed(game.id, game.state)),
  );

  return mapMatchDetails(event, feeds);
}
