const path = require("path");
import { GatsbyNode } from "gatsby";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";
import { getPlaystationNowGames } from "./src/data/playstationNowGames";
import { combinations } from "./src/utils";

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
  const platforms = [
    "Windows",
    "Linux",
    "Mac",
    "PS4",
    "PS3",
    "XBO",
    "Switch",
    "GamePass",
    "PSNow",
  ];

  // Generate unique combinations, so we can statically generate
  // a page for every possible filter combinations
  const filterCombos = combinations(platforms);

  filterCombos.forEach((filters) => {
    // We cannot dynamically change the query string, so we need a
    // clever way to be able to do things like:
    // { filter : { Switch: true } }
    //
    // We want to generate variables that look like this:
    // LinuxIncludes : [true, false]
    // XBOIncludes : [true]
    // etc
    // Which we can use as array to the include filter in the page query
    // Here [true,false] acts as 'dont worry' about this value
    const inVariables = platforms.reduce((acc, platform) => {
      const filterValue = filters.includes(platform) ? [true] : [true, false];
      acc[`${platform}Includes`] = filterValue;
      return acc;
    }, {});

    actions.createPage({
      path: filters.map((f) => f.toLowerCase()).join("/"),
      component: path.resolve(`./src/templates/FilterPage.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        filters,
        ...inVariables,
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
