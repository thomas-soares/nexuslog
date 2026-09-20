const PERSISTED_API_URL = "https://esports-api.lolesports.com/persisted/gw";
const DISPLAY_TIME_ZONE = "America/Sao_Paulo";
const API_KEY =
  process.env.LOL_ESPORTS_API_KEY ?? "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z";

type ScheduleTeam = {
  name?: string;
  image?: string;
  result?: {
    gameWins?: number;
    outcome?: string;
  };
};

type ScheduleEvent = {
  id?: string;
  startTime?: string;
  state?: string;
  blockName?: string;
  league?: {
    name?: string;
    slug?: string;
  };
  match?: {
    id?: string;
    teams?: ScheduleTeam[];
    strategy?: {
      count?: number;
    };
  };
};

type ScheduleResponse = {
  data?: {
    schedule?: {
      events?: ScheduleEvent[];
    };
  };
};

export type HomeMatch = {
  id: string;
  href: string;
  time: string;
  date: string;
  teams: [
    {
      name: string;
      image: string | null;
      score: number | null;
    },
    {
      name: string;
      image: string | null;
      score: number | null;
    },
  ];
  championship: string;
  stage: string;
  format: string;
  status: string;
};

export type HomeMatchesResult = {
  matches: HomeMatch[];
  error: string | null;
};

function formatMatchTime(startTime: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: DISPLAY_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(startTime));
}

function formatMatchDate(startTime: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(startTime));
}

function normalizeImageUrl(image: string | undefined) {
  if (!image) {
    return null;
  }

  return image.replace(/^http:\/\//, "https://");
}

function getNeededWins(bestOf: number) {
  return Math.ceil(bestOf / 2);
}

function isCompletedSeries(event: ScheduleEvent) {
  const bestOf = event.match?.strategy?.count ?? 1;
  const neededWins = getNeededWins(bestOf);

  return (
    event.state === "completed" ||
    event.match?.teams?.some((team) => (team.result?.gameWins ?? 0) >= neededWins) ||
    false
  );
}

function isFullyCompletedSeries(event: ScheduleEvent) {
  return event.state === "completed";
}

function toHomeMatch(event: ScheduleEvent): HomeMatch | null {
  const match = event.match;
  const teams = match?.teams;
  const startTime = event.startTime;

  if (!match?.id || !startTime || !teams?.[0] || !teams?.[1]) {
    return null;
  }

  return {
    id: match.id,
    href: `/lives/${match.id}`,
    time: formatMatchTime(startTime),
    date: formatMatchDate(startTime),
    teams: [
      {
        name: teams[0].name ?? "TBD",
        image: normalizeImageUrl(teams[0].image),
        score: teams[0].result?.gameWins ?? null,
      },
      {
        name: teams[1].name ?? "TBD",
        image: normalizeImageUrl(teams[1].image),
        score: teams[1].result?.gameWins ?? null,
      },
    ],
    championship: event.league?.name ?? "LoL Esports",
    stage: event.blockName ?? event.state ?? "-",
    format: `MD${match.strategy?.count ?? 1}`,
    status: event.state ?? "unstarted",
  };
}

async function getScheduleEvents() {
  const url = new URL(`${PERSISTED_API_URL}/getSchedule`);
  url.searchParams.set("hl", "en-US");

  const response = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`LoL Esports API responded with HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as ScheduleResponse;
  return payload.data?.schedule?.events ?? [];
}

export async function getUpcomingMatches(limit = 10): Promise<HomeMatchesResult> {
  try {
    const now = Date.now();
    const liveWindowLimit = now + 5 * 60 * 60 * 1000;
    const events = await getScheduleEvents();

    const matches = events
      .filter((event) => event.match && !isCompletedSeries(event))
      .filter((event) => {
        if (!event.startTime) {
          return false;
        }

        return new Date(event.startTime).getTime() >= now - 60 * 60 * 1000;
      })
      .map((event) => {
        if (!event.startTime) {
          return event;
        }

        const startsAt = new Date(event.startTime).getTime();

        if (startsAt <= liveWindowLimit) {
          return {
            ...event,
            state: "inProgress",
          };
        }

        return event;
      })
      .map(toHomeMatch)
      .filter((match): match is HomeMatch => Boolean(match))
      .slice(0, limit);

    return {
      matches,
      error: null,
    };
  } catch (error) {
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Failed to load matches.",
    };
  }
}

export async function getRecentMatches(limit = 10): Promise<HomeMatchesResult> {
  try {
    const now = Date.now();
    const events = await getScheduleEvents();

    const matches = events
      .filter((event) => event.match && event.startTime)
      .filter((event) => new Date(event.startTime as string).getTime() < now)
      .filter(isFullyCompletedSeries)
      .sort(
        (a, b) =>
          new Date(b.startTime as string).getTime() - new Date(a.startTime as string).getTime(),
      )
      .map(toHomeMatch)
      .filter((match): match is HomeMatch => Boolean(match))
      .slice(0, limit);

    return {
      matches,
      error: null,
    };
  } catch (error) {
    return {
      matches: [],
      error: error instanceof Error ? error.message : "Failed to load matches.",
    };
  }
}
