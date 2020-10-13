const path = require("path");
import { GatsbyNode } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";
import { getPlaystationNowGames } from "./src/data/playstationNowGames";
import { getGameDetailsMap } from "./src/data/wikiToIGDB";

import {
  allFilters,
  inVariablesFromFilter,
  urlFromFilter,
} from "./src/filters";

require("dotenv").config({
  path: `.env.build`,
});

const sourceGameNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  cache,
}) => {
  const crossplayGames = await getCrossplayGames();
  const gamePassGames = await getGamePassGames();
  const PSNowGames = await getPlaystationNowGames();
  const extraGameData = await getGameDetailsMap(
    crossplayGames.map((game) => game.title)
  );

  crossplayGames.map((game) =>
    createNode({
      title: game.title,
      ...(extraGameData[game.title] ?? {}),
      platforms: {
        ...game.platforms,
        PSNow: PSNowGames.some((PSNowGame) => PSNowGame.name === game.title),
        GamePass: gamePassGames.some((GPGame) => GPGame.title === game.title),
      },
      id: createNodeId(game.title),
      internal: {
        type: `Game`,
        contentDigest: createContentDigest(crossplayGames),
      },
    })
  );
};

const createFilterPages: GatsbyNode["createPages"] = async ({ actions }) => {
  allFilters
    .filter((filter) => filter.length)
    .forEach((filter) => {
      actions.createPage({
        path: urlFromFilter(filter),
        component: path.resolve(`./src/templates/FilterPage.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          filter,
          ...inVariablesFromFilter(filter),
        },
      });
    });
};

const addImagesToGameNodes: GatsbyNode["onCreateNode"] = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
  reporter,
}) => {
  if (node.internal.type === "Game" && node.coverUrl !== null) {
    let fileNode = await createRemoteFileNode({
      url: (node as any).coverUrl as string,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
      reporter,
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      (node as any).coverImage___NODE = fileNode.id;
    }
  }
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (args, options) => {
  await sourceGameNodes(args, options);
};

export const createPages: GatsbyNode["createPages"] = async (args) => {
  await createFilterPages(args);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = async (args) => {
  await addImagesToGameNodes(args);
};
