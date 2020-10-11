import { GatsbyNode } from "gatsby";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";
import { getPlaystationNowGames } from "./src/data/playstationNowGames";

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

const sourcePlaystationNowGameNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const games = await getPlaystationNowGames();
  games.map((game) =>
    createNode({
      ...game,
      id: createNodeId(game.name),
      internal: {
        type: `PlaystationNowGame`,
        contentDigest: createContentDigest(game),
      },
    })
  );
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (args, options) => {
  await sourceCrossplayGameNodes(args, options);
  await sourceGamePassGameNodes(args, options);
  await sourcePlaystationNowGameNodes(args, options);
};

const onCreateCrossplayGameNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNodesByType,
  actions: { createNodeField },
}) => {
  const { name } = node;
  const onPlaystationNow = getNodesByType("PlaystationNowGame").some(
    (node) => node.name === name
  );
  createNodeField({
    node,
    name: "PSNow",
    value: onPlaystationNow,
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  const { node } = args;
  if (node.internal.type === "CrossplayGame") onCreateCrossplayGameNode(args);
};
