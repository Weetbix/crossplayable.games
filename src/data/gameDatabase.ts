import fetch from "node-fetch";
import { chunk } from "../utils";

const getAccessToken = async () => {
  const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;
  const OAUTH_TOKEN_ENDPOINT = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await fetch(OAUTH_TOKEN_ENDPOINT, {
    method: "POST",
  });
  const result = await response.json();
  console.log(result);
  return result.access_token;
};

const getBatchOfGameDetals = async (titles: string[], token: string) => {
  const titleList = titles.map((t) => `"${t}"`).join(",");
  const query = `
    limit ${titles.length};
    fields name;
    where name = (${titleList});
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
  return await response.json();
};

// Max items to return https://api-docs.igdb.com/#pagination
const MAX_ITEM_LIMIT = 500;

export const getGameDetails = async (titles: string[]) => {
  const token = await getAccessToken();
  const gameChunks = chunk(titles, MAX_ITEM_LIMIT);
  let games = [];
  for (let i = 0; i < gameChunks.length; i++) {
    games = [...games, ...(await getBatchOfGameDetals(gameChunks[i], token))];
  }
  return games;
};
