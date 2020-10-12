import fetch from "node-fetch";
import { executeInChunks } from "../utils";

const getGameIds = async () => {
  const ALL_PC_GAMES_URL =
    "https://catalog.gamepass.com/sigls/v2?id=fdd9e2a7-0fee-49f6-ad69-4354098401ff&language=en-us&market=US";
  const ALL_CONSOLE_GAMES_URL =
    "https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=US";

  const idsFromURL = async (url) => {
    const response = await fetch(url);
    const result = (await response.json()) as Array<{ id: string }>;
    // The first result is a descriptor
    return result.slice(1).map((item) => item.id);
  };

  // Return unique ids
  return Array.from(
    new Set([
      ...(await idsFromURL(ALL_PC_GAMES_URL)),
      ...(await idsFromURL(ALL_CONSOLE_GAMES_URL)),
    ])
  );
};

const getGameDetails = async (gameIds: string[]) => {
  const DETAILS_URL = `https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${gameIds.join(
    ","
  )}&market=US&languages=en-us&MS-CV=DGU1mcuYo0WMMp+F.1`;

  const response = await fetch(DETAILS_URL);
  const result = await response.json();
  return result.Products;
};

export const getGamePassGames = async () => {
  const AllIds = await getGameIds();
  const games = await executeInChunks(20, AllIds, (ids) => getGameDetails(ids));
  return games.map((game) => ({
    title: game.LocalizedProperties[0].ProductTitle,
  }));
};
