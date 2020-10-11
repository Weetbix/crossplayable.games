const path = require("path");
import { GatsbyNode } from "gatsby";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";
import { getPlaystationNowGames } from "./src/data/playstationNowGames";
import { combinations } from "./src/utils";
import {
  allFilters,
  inVariablesFromFilter,
  urlFromFilter,
} from "./src/filters";

const sourceGameNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  cache,
}) => {
  const crossplayGames = await getCrossplayGames();
  const gamePassGames = await getGamePassGames();
  const PSNowGames = await getPlaystationNowGames();

  crossplayGames.map((game) =>
    createNode({
      title: game.title,
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

export const sourceNodes: GatsbyNode["sourceNodes"] = async (args, options) => {
  await sourceGameNodes(args, options);
};

export const createPages: GatsbyNode["createPages"] = async (args) => {
  await createFilterPages(args);
};
