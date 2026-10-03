export type HomeTab = "upcoming" | "recent";

export const PAGE_SIZE = 10;
export const ALL_UPCOMING_LIMIT = 1000;

export const tabContent: Record<HomeTab, { title: string; description: string }> = {
  upcoming: {
    title: "Próximas partidas",
    description: "Partidas ao vivo e próximas partidas de League of Legends",
  },
  recent: {
    title: "Jogos recentes",
    description: "Todas as partidas de LoL já realizadas disponíveis na agenda",
  },
};

export function getActiveTab(tab: string | string[] | undefined): HomeTab {
  const value = Array.isArray(tab) ? tab[0] : tab;

  return value === "recent" ? "recent" : "upcoming";
}

export function getCurrentPage(page: string | string[] | undefined) {
  const value = Array.isArray(page) ? page[0] : page;
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function getPageHref(tab: HomeTab, page: number) {
  const params = new URLSearchParams();

  if (tab === "recent") {
    params.set("tab", "recent");
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/?${query}` : "/";
}
