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

// Map a single API result to an object
const mapData = (apiResult: any) => {
  const game = apiResult as IGDBGame;
  return {
    ...game,
    name: undefined,
    title: game.name,
  };
};

// Max items to return https://api-docs.igdb.com/#pagination
const MAX_ITEM_LIMIT = 500;

export const getGameDetails = async (titles: string[]) => {
  const token = await getAccessToken();
  const games = await executeInChunks(MAX_ITEM_LIMIT, titles, (titles) =>
    getBatchOfGameDetals(titles, token)
  );
  return games.map(mapData);
};
