import type { HomeMatch } from "@/lib/lolesports";
import { RecentResultsCard } from "./_components/recent-results-card";
import { UpcomingMatchesCard } from "./_components/upcoming-matches-card";

export function MatchSidebar({
  upcomingMatches,
  recentMatches,
}: {
  upcomingMatches: HomeMatch[];
  recentMatches: HomeMatch[];
}) {
  return (
    <>
      <UpcomingMatchesCard matches={upcomingMatches} />
      <RecentResultsCard matches={recentMatches} />
    </>
  );
}
