import { GatsbyNode } from "gatsby";
import { getCrossplayGames } from "./src/data/crossplayGames";
import { getGamePassGames } from "./src/data/gamepassGames";
import { getPlaystationNowGames } from "./src/data/playstationNowGames";

const sourceGameNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  cache,
}) => {
  const crossplayGames = await getCrossplayGames();
  const gamePassGames = await getGamePassGames();
  const PSNowGames = await getPlaystationNowGames();
  console.log(gamePassGames);

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

export const sourceNodes: GatsbyNode["sourceNodes"] = async (args, options) => {
  await sourceGameNodes(args, options);
};
