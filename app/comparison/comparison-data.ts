export type TeamComparison = {
  team: string;
  games: number;
  winRate: number;
  blueWinRate: number;
  redWinRate: number;
  averageGameTime: string;
  firstBloodRate: number;
  firstHeraldRate: number;
  firstTowerRate: number;
  firstDragonRate: number;
  firstBaronRate: number;
  averageGold: string;
};

export const comparisonChampionship = "CBLOL 2026 Season/Split 1";

// Temporary scaffold values based on the reference layout. The API adapter can replace this dataset later.
export const comparisonTeams: TeamComparison[] = [
  { team: "VKS", games: 16, winRate: 56.2, blueWinRate: 66.7, redWinRate: 25, averageGameTime: "33:17", firstBloodRate: 50, firstHeraldRate: 37.5, firstTowerRate: 43.8, firstDragonRate: 25, firstBaronRate: 37.5, averageGold: "64.53K" },
  { team: "RED", games: 16, winRate: 81.2, blueWinRate: 90, redWinRate: 66.7, averageGameTime: "33:32", firstBloodRate: 68.8, firstHeraldRate: 43.8, firstTowerRate: 68.8, firstDragonRate: 56.2, firstBaronRate: 75, averageGold: "69.03K" },
  { team: "PAIN", games: 16, winRate: 25, blueWinRate: 40, redWinRate: 18.2, averageGameTime: "31:06", firstBloodRate: 56.2, firstHeraldRate: 43.8, firstTowerRate: 37.5, firstDragonRate: 50, firstBaronRate: 18.8, averageGold: "57.09K" },
  { team: "LOUD", games: 17, winRate: 52.9, blueWinRate: 66.7, redWinRate: 20, averageGameTime: "33:41", firstBloodRate: 35.3, firstHeraldRate: 76.5, firstTowerRate: 58.8, firstDragonRate: 41.2, firstBaronRate: 52.9, averageGold: "65.87K" },
  { team: "LOS", games: 18, winRate: 50, blueWinRate: 66.7, redWinRate: 33.3, averageGameTime: "32:32", firstBloodRate: 38.9, firstHeraldRate: 44.4, firstTowerRate: 61.1, firstDragonRate: 38.9, firstBaronRate: 50, averageGold: "63.81K" },
  { team: "LEV", games: 15, winRate: 13.3, blueWinRate: 0, redWinRate: 15.4, averageGameTime: "32:34", firstBloodRate: 53.3, firstHeraldRate: 33.3, firstTowerRate: 33.3, firstDragonRate: 60, firstBaronRate: 20, averageGold: "58.49K" },
];
