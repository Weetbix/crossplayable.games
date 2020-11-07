import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// This game is not relased, but is listed in the wiki article
const GAMES_TO_EXCLUDE = ["Need for Speed: Hot Pursuit Remastered"];

const CROSSPLAY_ARTICLE_URL =
  "https://en.wikipedia.org/wiki/List_of_video_games_that_support_cross-platform_play";

// Some rows dont have names due to rowspan. Search up
// util we find the next parent with a name
const getTitleFromRow = (row: HTMLTableRowElement) =>
  row.querySelector("td i")?.textContent.trim() ??
  getTitleFromRow(row.previousElementSibling as HTMLTableRowElement);

const PLATFORM_MAP = {
  GOG: "Windows",
  Steam: "Windows",
  W10: "Windows",
  Other: "Windows",
  XBO: "Xbox",
};
const PLATFORMS_TO_KEEP = [
  "Windows",
  "Linux",
  "Mac",
  "PS4",
  "PS3",
  "Xbox",
  "Switch",
];

const PlATFORM_DEFAULTS = {
  ...PLATFORMS_TO_KEEP.reduce((acc, platform) => {
    acc[platform] = false;
    return acc;
  }, {}),
};

// Get all the plaforms as a boolean map
const getPlatformsFromRow = (row: HTMLTableRowElement) =>
  Array.from(row.querySelectorAll("td.table-yes"))
    .map((cell) => cell.textContent.trim())
    .map((platform) => PLATFORM_MAP[platform] ?? platform)
    .filter((platform) => PLATFORMS_TO_KEEP.includes(platform))
    .reduce(
      (acc, obj) => ({
        ...acc,
        [obj]: true,
      }),
      {}
    );

export const getCrossplayGames = async () => {
  const result = await fetch(CROSSPLAY_ARTICLE_URL);
  const document = new JSDOM(await result.text()).window.document;

  const table = document.querySelector("tbody");
  const gameRows = Array.from(table.querySelectorAll("tr")).filter(
    (row) => row.firstElementChild.tagName !== "TH"
  );

  const games = gameRows
    .map((row) => ({
      title: getTitleFromRow(row),
      platforms: {
        ...PlATFORM_DEFAULTS,
        ...getPlatformsFromRow(row),
      },
    }))
    .filter((game) => !GAMES_TO_EXCLUDE.includes(game.title));

  if (games.length < 200)
    throw new Error("Lower than expected amount of crossplayable games found");

  return games;
};
