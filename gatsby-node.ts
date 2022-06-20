const path = require("path");
import { CreateNodeArgs, CreatePagesArgs, GatsbyNode, SourceNodesArgs } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";
import { getPlaystationPlusGames } from "./src/data/playstationPlusGames";
import { getGameDetailsMap } from "./src/data/wikiToIGDB";

import {
  allFilters,
  inVariablesFromFilter,
  urlFromFilter,
} from "./src/filters";

require("dotenv").config({
  path: `.env.build`,
});

const sourceGameNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  cache,
} : SourceNodesArgs) => {
  const crossplayGames = await getCrossplayGames();
  const gamePassGames = await getGamePassGames();
  const PSPlusGames = await getPlaystationPlusGames();
  const extraGameData = await getGameDetailsMap(
    crossplayGames.map((game) => game.title)
  );

  crossplayGames.map((game) =>
    createNode({
      title: game.title,
      ...(extraGameData[game.title] ?? {}),
      platforms: {
        ...game.platforms,
        PlaystationPlus: PSPlusGames.some((PSPlusGame) => PSPlusGame.name === game.title),
        GamePass: gamePassGames.some((GPGame) => GPGame.title === game.title),
      },
      id: createNodeId(`${game.title}${JSON.stringify(game.platforms)}`),
      internal: {
        type: `Game`,
        contentDigest: createContentDigest(crossplayGames),
      },
    })
  );
};

const createFilterPages = async ({ actions } : CreatePagesArgs) => {
  allFilters
    .filter((filter) => filter.length)
    .forEach((filter) => {
      actions.createPage({
        path: urlFromFilter(filter),
        component: path.resolve(`./src/templates/FilterPage/index.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          filter,
          ...inVariablesFromFilter(filter),
        },
      });
    });
};

const createGamePages = async ({
  graphql,
  actions,
} : CreatePagesArgs) => {
  const { createPage } = actions;
  const result = (await graphql(`
    query GetGamePagesBySlug {
      allGame {
        group(field: fields___slug) {
          fieldValue
        }
      }
    }
  `)) as any;

  result.data.allGame.group.forEach(({ fieldValue: slug }) => {
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/GamePage/index.tsx`),
      context: {
        slug,
      },
    });
  });
};

// We're already on google with many xbo routes, which have now
// been renamed to xbox.
// Lets try not to kill the SEO and provide permanent redirects
const createXBOtoXboxRedirects = async ({
  actions,
}: CreatePagesArgs) => {
  allFilters
    .filter((filter) => filter.some((platform) => platform === "Xbox"))
    .forEach((filter) => {
      const newUrl = urlFromFilter(filter);
      const oldUrl = newUrl.replace("xbox", "xbo");

      actions.createRedirect({
        fromPath: oldUrl,
        toPath: newUrl,
        isPermanent: true,
      });
    });
};

async function addImageFromUrl(
  propertyName: string,
  fieldName: string,
  node,
  createNode,
  createNodeId: (input: string) => string,
  cache,
  store,
  reporter
) {
  const url = (node as any)[propertyName];
  if (url) {
    try {
      let fileNode = await createRemoteFileNode({
        url: (node as any)[propertyName] as string,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
        reporter,
      });
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        (node as any)[`${fieldName}___NODE`] = fileNode.id;
      }
    } catch (e) {
      console.log("Warning: Unable to fetch remote image");
      console.log("URL: " + url);
      console.log(JSON.stringify(e));
    }
  }
}

const addImagesToGameNodes = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
  reporter,
} : CreateNodeArgs) => {
  if (node.internal.type === "Game") {
    await addImageFromUrl(
      "coverUrl",
      "coverImage",
      node,
      createNode,
      createNodeId,
      cache,
      store,
      reporter
    );
    await addImageFromUrl(
      "backdropUrl",
      "backdropImage",
      node,
      createNode,
      createNodeId,
      cache,
      store,
      reporter
    );

    // For now, disable screenshot fetching.
    // const screenshotArray = (node as any).screenshots ?? [];
    // for (let i = 0; i < screenshotArray.length; i++) {
    //   const screenshotItem = screenshotArray[i];
    //   try {
    //     let fileNode = await createRemoteFileNode({
    //       url: screenshotItem.url,
    //       parentNodeId: node.id,
    //       createNode,
    //       createNodeId,
    //       cache,
    //       store,
    //       reporter,
    //     });
    //     // if the file was created, attach the new node to the parent node
    //     if (fileNode) {
    //       screenshotItem[`image___NODE`] = fileNode.id;
    //     }
    //   } catch (e) {
    //     console.log("Warning: Unable to fetch remote image");
    //     console.log("URL: " + screenshotItem.url);
    //     console.log(JSON.stringify(e));
    //   }
    // }
  }
};

const addSlugsToGameNodes = async ({
  node,
  actions: { createNodeField },
} : CreateNodeArgs) => {
  if (node.internal.type === "Game") {
    // Get a "url nice" version of a games name
    const title: string = (node as any).title
      .replace("&", "and")
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, "-");
    const slug = `/games/does-${title}-support-crossplay`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

export const sourceNodes: GatsbyNode["sourceNodes"] = async (args, options) => {
  await sourceGameNodes(args);
};

export const createPages: GatsbyNode["createPages"] = async (args) => {
  await createXBOtoXboxRedirects(args);
  await createFilterPages(args);
  await createGamePages(args);
};

export const onCreateNode: GatsbyNode["onCreateNode"] = async (args) => {
  await addImagesToGameNodes(args);
  await addSlugsToGameNodes(args);
};
