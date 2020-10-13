import fetch from "node-fetch";
import { executeInChunks } from "../utils";

// This game is not relased, but is listed in the wiki article
const WIKIPEDIA_GAMES_TO_EXCLUDE = ["Need for Speed: Hot Pursuit Remastered"];

// Games titles on the wiki article do not neccessarily match those
// on the IGDB, so here we provide conversion maps for the few that dont.
const WIKI_NAME_TO_IGDB_NAME_MAP: Record<string, string> = {
  "Digimon Story: Cyber Sleuth": "Digimon Story Cyber Sleuth",
  "Digimon Story: Cyber Sleuth – Hacker's Memory": `Digimon Story: Cyber Sleuth - Hacker's Memory`,
  "Duke Nukem 3D Megaton Edition": "Duke Nukem 3D: Megaton Edition",
  "Final Fantasy XIV: A Realm Reborn": "FINAL FANTASY XIV Online",
  "Fortnite Battle Royale": "Fortnite",
  "God Eater 2 Rage Burst": "God Eater 2 - Rage Burst",
  "Guns of Icarus: Alliance": "Guns of Icarus Alliance",
  "Lost Planet: Extreme Condition Colonies Edition":
    "Lost Planet: Extreme Condition - Colonies Edition",
  "Minecraft: Java Edition": "Minecraft",
  "Need for Speed Heat": "Need for Speed: Heat",
  "Neverwinter Nights (Enhanced Edition)":
    "Neverwinter Nights: Enhanced Edition",
  "Pinball FX 3": "Pinball FX3",
  "Riptide GP Renegade": "Riptide GP: Renegade",
  "Risk_(game)": "RISK",
  Warspear: "Warspear Online",
  "Yakuza: Ishin": "Ryuu ga Gotoku Ishin!",
  "Zombie Tycoon 2": `Zombie Tycoon 2: Brainhov's Revenge`,
};

const toIGDBName = (wikiName: string) =>
  WIKI_NAME_TO_IGDB_NAME_MAP[wikiName] ?? wikiName;

const IGDB_NAME_TO_WIKI_NAME_MAP: Record<string, string> = Object.keys(
  WIKI_NAME_TO_IGDB_NAME_MAP
).reduce((map, key) => {
  map[toIGDBName(key)] = key;
  return map;
}, {});

// Map an IGDB name back to the name we find on wikipedia
// Here we should first check the manual override map, if
// not in there we should find the name in the original titles
// list so that we can avoid problems with differences in cases.
const toWikiName = (IGDBName: string, originalTitles: string[]) =>
  IGDB_NAME_TO_WIKI_NAME_MAP[IGDBName] ??
  originalTitles.find((t) => t.toLowerCase() === IGDBName.toLowerCase());

const getAccessToken = async () => {
  const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
  const OAUTH_TOKEN_ENDPOINT = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await fetch(OAUTH_TOKEN_ENDPOINT, {
    method: "POST",
  });
  const result = await response.json();
  return result.access_token;
};

// The expected return type from the API
type IGDBGame = {
  name: string;
  rating: number;
  rating_count: number;
  total_rating: number;
  total_rating_count: number;
  storyline: string;
  summary: string;
  websites: Array<{
    url: string;
    category: number;
  }>;
  cover: {
    image_id: string;
  };
  genres: Array<{
    name: string;
  }>;
};
const getBatchOfGameDetals = async (titles: string[], token: string) => {
  const titleFilters = titles
    .map(toIGDBName)
    .map((t) => `(name ~ "${t}")`)
    .join("|");

  const query = `
    limit ${titles.length};
    fields
        name,
        rating,
        rating_count,
        total_rating,
        total_rating_count,
        storyline,
        summary,
        websites.url,
        websites.category,
        cover.image_id,
        genres.name;
    where ${titleFilters};
    `;

  const GAME_ENDPOINT = `https://api.igdb.com/v4/games`;
  const response = await fetch(GAME_ENDPOINT, {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${token}`,
    },
    body: query,
  });
  if (response.status !== 200) {
    throw new Error(
      JSON.stringify(
        {
          message: "IGDB Query failed",
          status: response.status,
          response: await response.json(),
        },
        null,
        2
      )
    );
  }
  return await response.json();
};

// Map a single API result to an object.
// title is mapped to the original wiki name
// so that matching can be done more easily
const mapIGDBData = (apiResult: any, originalTitles: string[]) => {
  const game = apiResult as IGDBGame;
  return {
    ...game,
    title: toWikiName(game.name, originalTitles),
  };
};

// Max items to return https://api-docs.igdb.com/#pagination
const MAX_ITEM_LIMIT = 500;

export const getGameDetailsMap = async (titles: string[]) => {
  const token = await getAccessToken();
  const games = await executeInChunks(MAX_ITEM_LIMIT, titles, (titles) =>
    getBatchOfGameDetals(titles, token)
  );

  // throw an error if there is a game we could not match. We would
  // then have to manually add the transformation...
  type IGDBDataMap = Record<string, ReturnType<typeof mapIGDBData>>;
  return (
    games
      // Map every response item
      .map((game) => mapIGDBData(game, titles))
      // convert into a map with the game name as the key
      .reduce<IGDBDataMap>((map, game) => {
        map[game.title] = game;
        return map;
      }, {})
  );
};
