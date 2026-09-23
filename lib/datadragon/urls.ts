const DATA_DRAGON_BASE_URL = "https://ddragon.leagueoflegends.com/cdn";

export function championImageUrl(championId: string, patchVersion: string) {
  return `${DATA_DRAGON_BASE_URL}/${patchVersion}/img/champion/${championId}.png`;
}

export function itemImageUrl(itemId: string, patchVersion: string) {
  return `${DATA_DRAGON_BASE_URL}/${patchVersion}/img/item/${itemId}.png`;
}
