import fetch from "node-fetch";
import { executeInChunks } from "../utils";

const getAccessToken = async () => {
  const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
  const OAUTH_TOKEN_ENDPOINT = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await fetch(OAUTH_TOKEN_ENDPOINT, {
    method: "POST",
  });
  const result = await response.json();
  return result.access_token;
};

const getBatchOfGameDetals = async (titles: string[], token: string) => {
  const titleFilters = titles.map((t) => `(name ~ "${t}")`).join("|");

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
        screenshots.image_id,
        genres.name,
        aggregated_rating,
        aggregated_rating_count,
        first_release_date,
        game_modes.name,
        involved_companies.publisher,
        involved_companies.developer,
        involved_companies.company.name,
        involved_companies.company.websites.url,
        involved_companies.company.websites.category,
        keywords.name,
        similar_games,
        themes.name;
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

enum IGDB_WEBSITE_CATEGORY {
  official = 1,
  wikia = 2,
  wikipedia = 3,
  facebook = 4,
  twitter = 5,
  twitch = 6,
  instagram = 8,
  youtube = 9,
  iphone = 10,
  ipad = 11,
  android = 12,
  steam = 13,
  reddit = 14,
  itch = 15,
  epicgames = 16,
  gog = 17,
  discord = 18,
}

const mapWebsites = (websites: [{ category: number; url: string }]) => {
  return websites.reduce((acc, website) => {
    const categoryString = IGDB_WEBSITE_CATEGORY[website.category];
    categoryString && (acc[categoryString] = website.url);
    return acc;
  }, {});
};

// Map a single API result to an object
const mapData = (apiResult: any) => {
  const game = apiResult;

  enum IGDB_IMAGE_SIZE {
    cover = "cover_big_2x",
    screenshot = "screenshot_big",
  }
  const igdbImageIdToURL = (image_id, type: IGDB_IMAGE_SIZE) =>
    image_id
      ? `https://images.igdb.com/igdb/image/upload/t_${type}/${image_id}.jpg`
      : null;

  game.screenshots = game.screenshots?.map((screenshot) => ({
    id: screenshot.id,
    url: igdbImageIdToURL(screenshot.image_id, IGDB_IMAGE_SIZE.screenshot),
  }));

  return {
    ...game,
    name: undefined,
    cover: undefined,
    title: game.name,
    coverUrl: igdbImageIdToURL(game.cover?.image_id, IGDB_IMAGE_SIZE.cover),
    backdropUrl: game.screenshots?.[0].url ?? null,
    websites: mapWebsites(game.websites ?? []),
  };
};

// Max items to return https://api-docs.igdb.com/#pagination
const MAX_ITEM_LIMIT = 500;

export const getGameDetails = async (titles: string[]) => {
  const token = await getAccessToken();
  const games = await executeInChunks(MAX_ITEM_LIMIT, titles, (titles) =>
    getBatchOfGameDetals(titles, token)
  );
  if (games.length < 180)
    throw new Error("Lower than expected amount of games in gamedatabasefound");

  return games.map(mapData);
};
