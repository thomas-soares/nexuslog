export type TeamComparison = {
  team: string;
  games: number;
  winRate: number;
  blueWinRate: number;
  redWinRate: number;
  firstBloodRate: number;
  firstGrubRate: number;
  firstHeraldRate: number;
  firstTowerRate: number;
  firstDragonRate: number;
  firstBaronRate: number;
  averageGameTime: string;
  averageGold: string;
  averageKills: number;
  averageDeaths: number;
  averageTowers: number;
  averageDragons: number;
  averageBarons: number;
};

export type ComparisonTournament = {
  id: string;
  label: string;
  teams: TeamComparison[];
};

const c = (team: string, values: Omit<TeamComparison, "team">): TeamComparison => ({ team, ...values });

const cblolTeams: TeamComparison[] = [
  c("VKS", { games: 16, winRate: 56.2, blueWinRate: 66.7, redWinRate: 25, firstBloodRate: 50, firstGrubRate: 43.8, firstHeraldRate: 37.5, firstTowerRate: 43.8, firstDragonRate: 25, firstBaronRate: 37.5, averageGameTime: "33:17", averageGold: "64.53K", averageKills: 13.8, averageDeaths: 13.2, averageTowers: 5.9, averageDragons: 2.1, averageBarons: 0.8 }),
  c("RED", { games: 16, winRate: 81.2, blueWinRate: 90, redWinRate: 66.7, firstBloodRate: 68.8, firstGrubRate: 56.2, firstHeraldRate: 43.8, firstTowerRate: 68.8, firstDragonRate: 56.2, firstBaronRate: 75, averageGameTime: "33:32", averageGold: "69.03K", averageKills: 16.4, averageDeaths: 9.7, averageTowers: 7.1, averageDragons: 2.8, averageBarons: 1.1 }),
  c("PAIN", { games: 16, winRate: 25, blueWinRate: 40, redWinRate: 18.2, firstBloodRate: 56.2, firstGrubRate: 37.5, firstHeraldRate: 43.8, firstTowerRate: 37.5, firstDragonRate: 50, firstBaronRate: 18.8, averageGameTime: "31:06", averageGold: "57.09K", averageKills: 10.1, averageDeaths: 15.2, averageTowers: 4.4, averageDragons: 1.8, averageBarons: 0.4 }),
  c("LOUD", { games: 17, winRate: 52.9, blueWinRate: 66.7, redWinRate: 20, firstBloodRate: 35.3, firstGrubRate: 58.8, firstHeraldRate: 76.5, firstTowerRate: 58.8, firstDragonRate: 41.2, firstBaronRate: 52.9, averageGameTime: "33:41", averageGold: "65.87K", averageKills: 13.1, averageDeaths: 12.8, averageTowers: 6.2, averageDragons: 2.4, averageBarons: 0.9 }),
  c("LOS", { games: 18, winRate: 50, blueWinRate: 66.7, redWinRate: 33.3, firstBloodRate: 38.9, firstGrubRate: 50, firstHeraldRate: 44.4, firstTowerRate: 61.1, firstDragonRate: 38.9, firstBaronRate: 50, averageGameTime: "32:32", averageGold: "63.81K", averageKills: 12.5, averageDeaths: 12.9, averageTowers: 5.8, averageDragons: 2.2, averageBarons: 0.8 }),
  c("LEV", { games: 15, winRate: 13.3, blueWinRate: 0, redWinRate: 15.4, firstBloodRate: 53.3, firstGrubRate: 26.7, firstHeraldRate: 33.3, firstTowerRate: 33.3, firstDragonRate: 60, firstBaronRate: 20, averageGameTime: "32:34", averageGold: "58.49K", averageKills: 8.4, averageDeaths: 16.1, averageTowers: 3.7, averageDragons: 1.6, averageBarons: 0.3 }),
];

export const comparisonTournaments: ComparisonTournament[] = [
  { id: "cblol-2026-split-1", label: "CBLOL/2026 Season/Split 1", teams: cblolTeams },
  { id: "cblol-2025-split-2", label: "CBLOL/2025 Season/Split 2", teams: cblolTeams.map((team) => ({ ...team, winRate: Math.max(0, team.winRate - 4.5) })) },
];

export const comparisonChampionship = comparisonTournaments[0].label;
export const comparisonTeams = comparisonTournaments[0].teams;

export function getComparisonTournament(id: string | undefined) {
  return comparisonTournaments.find((tournament) => tournament.id === id) ?? comparisonTournaments[0];
}
