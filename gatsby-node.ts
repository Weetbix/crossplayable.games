import { GatsbyNode } from "gatsby";
import { getGames } from "./src/data/crossplaySupport";

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const games = await getGames();

  return games.map((game) =>
    createNode({
      ...game,
      id: createNodeId(game.name),
      internal: {
        type: `Game`,
        contentDigest: createContentDigest(game),
      },
    })
  );
};
