import { GatsbyNode } from "gatsby";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";

const sourceCrossplayGameNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const games = await getCrossplayGames();
  games.map((game) =>
    createNode({
      ...game,
      id: createNodeId(game.name),
      internal: {
        type: `CrossplayGame`,
        contentDigest: createContentDigest(game),
      },
    })
  );
};

const sourceGamePassGameNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const games = await getGamePassGames();
  games.map((game) =>
    createNode({
      ...game,
      id: createNodeId(game.ProductId),
      internal: {
        type: `GamePassGame`,
        contentDigest: createContentDigest(game),
      },
    })
  );
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (args, options) => {
  await sourceCrossplayGameNodes(args, options);
  await sourceGamePassGameNodes(args, options);
};
