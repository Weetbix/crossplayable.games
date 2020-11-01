import { getGameDetails } from "./gameDatabase";
import { keyBy } from "lodash";

// Games titles on the wiki article do not neccessarily match those
// on the IGDB, so here we provide conversion maps for the few that dont.
const WIKI_NAME_TO_IGDB_NAME_MAP: Record<string, string> = {
  "Digimon Story: Cyber Sleuth": "Digimon Story Cyber Sleuth",
  "Digimon Story: Cyber Sleuth – Hacker's Memory": `Digimon Story: Cyber Sleuth - Hacker's Memory`,
  "Duke Nukem 3D Megaton Edition": "Duke Nukem 3D: Megaton Edition",
  "Final Fantasy XIV: A Realm Reborn": "FINAL FANTASY XIV Online",
  "Fortnite Battle Royale": "Fortnite",
  "God Eater 2 Rage Burst": "God Eater 2 - Rage Burst",
  "Guns of Icarus: Alliance": "Guns of Icarus Alliance",
  "Lost Planet: Extreme Condition Colonies Edition":
    "Lost Planet: Extreme Condition - Colonies Edition",
  "Minecraft: Java Edition": "Minecraft",
  "Minecraft: Bedrock Edition": "Minecraft",
  "Need for Speed Heat": "Need for Speed: Heat",
  "Neverwinter Nights (Enhanced Edition)":
    "Neverwinter Nights: Enhanced Edition",
  "Pinball FX 3": "Pinball FX3",
  "Riptide GP Renegade": "Riptide GP: Renegade",
  "Risk_(game)": "RISK",
  Warspear: "Warspear Online",
  "Yakuza: Ishin": "Ryuu ga Gotoku Ishin!",
  "Zombie Tycoon 2": `Zombie Tycoon 2: Brainhov's Revenge`,
};

const toIGDBName = (wikiName: string) =>
  WIKI_NAME_TO_IGDB_NAME_MAP[wikiName] ?? wikiName;

const IGDB_NAME_TO_WIKI_NAME_MAP: Record<string, string> = Object.keys(
  WIKI_NAME_TO_IGDB_NAME_MAP
).reduce((map, key) => {
  map[toIGDBName(key)] = key;
  return map;
}, {});

// Given a list of wiki game names, fetches all the game details from
// IGDB and returns them in a map, based on the original wiki game name
// so we dont need to care about descrepencies in naming.
export const getGameDetailsMap = async (titles: string[]) => {
  // Get all the game details with their igdb name
  let igdbGames = await getGameDetails(titles.map(toIGDBName));

  // Convert all the igdb names back to wiki names.
  // We cannot simply use an inverse map, as some games map to
  // one individual igbd game (ie minecraft bedrock/java version)
  const games = titles.reduce((acc, wikiTitle) => {
    const igdbGameDetails = igdbGames.find(
      (game) => game.title.toLowerCase() === toIGDBName(wikiTitle).toLowerCase()
    );
    if (igdbGameDetails) {
      acc.push({
        ...igdbGameDetails,
        title: wikiTitle,
      });
    } else {
      throw new Error(
        "The following game with title from wikipedia could not be found on IGDB: " +
          wikiTitle
      );
    }
    return acc;
  }, []);

  // return a map by game title
  return keyBy(games, (game) => game.title);
};
