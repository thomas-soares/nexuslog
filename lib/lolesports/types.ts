export type ScheduleTeam = {
  name?: string;
  image?: string;
  result?: {
    gameWins?: number;
    outcome?: string;
  };
};

export type ScheduleEvent = {
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

export type ScheduleResponse = {
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
