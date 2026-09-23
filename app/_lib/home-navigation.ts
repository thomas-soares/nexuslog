export type HomeTab = "proximas" | "recentes";

export const RECENT_LIMIT = 24;
export const PAGE_SIZE = 10;
export const ALL_UPCOMING_LIMIT = 1000;

export const tabContent: Record<HomeTab, { title: string; description: string }> = {
  proximas: {
    title: "Jogos ao vivo",
    description: "Veja aos jogos de LoL que estao rolando ao vivo",
  },
  recentes: {
    title: "Jogos recentes",
    description: "Ultimos 24 jogos de LoL 100% realizados",
  },
};

export function getActiveTab(tab: string | string[] | undefined): HomeTab {
  const value = Array.isArray(tab) ? tab[0] : tab;

  return value === "recentes" ? "recentes" : "proximas";
}

export function getCurrentPage(page: string | string[] | undefined) {
  const value = Array.isArray(page) ? page[0] : page;
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function getPageHref(tab: HomeTab, page: number) {
  const params = new URLSearchParams();

  if (tab === "recentes") {
    params.set("tab", "recentes");
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/?${query}` : "/";
}
