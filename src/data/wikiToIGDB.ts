import { getGameDetails } from "./gameDatabase";
import { keyBy } from "lodash";

// Games titles on the wiki article do not necessarily match those
// on the IGDB, so here we provide conversion maps for the few that dont.
const WIKI_NAME_TO_IGDB_NAME_MAP: Record<string, string> = {
  "Black Desert Online": "Black Desert",
  "Digimon Story: Cyber Sleuth": "Digimon Story Cyber Sleuth",
  "Digimon Story: Cyber Sleuth – Hacker's Memory": `Digimon Story: Cyber Sleuth - Hacker's Memory`,
  "Duke Nukem 3D Megaton Edition": "Duke Nukem 3D: Megaton Edition",
  "Everybody's Golf 6": "Everybody's Golf",
  "Final Fantasy XIV: A Realm Reborn": "FINAL FANTASY XIV Online",
  "Fortnite Battle Royale": "Fortnite",
  "Fall Guys: Ultimate Knockout": "Fall Guys",
  "God Eater 2 Rage Burst": "God Eater 2: Rage Burst",
  "Guilty Gear Strive": "Guilty Gear: Strive",
  "Guns of Icarus: Alliance": "Guns of Icarus Alliance",
  "Lost Planet: Extreme Condition Colonies Edition":
  "Lost Planet: Extreme Condition - Colonies Edition",
  "MechWarrior 5": "MechWarrior 5: Mercenaries",
  "Minecraft: Java Edition": "Minecraft",
  "Minecraft: Bedrock Edition": "Minecraft",
  "Neverwinter Nights (Enhanced Edition)":
  "Neverwinter Nights: Enhanced Edition",
  "Nitroplus Blasterz: Heroine's Infinite Duel": "Nitroplus Blasterz: Heroines Infinite Duel",
  "Overcooked: All You Can Eat": "Overcooked! All You Can Eat",
  "Pinball FX 3": "Pinball FX3",
  "PlayerUnknown's Battlegrounds": "PUBG: BATTLEGROUNDS",
  "Realm Royale": "Realm Royale Reforged",
  "Riptide GP Renegade": "Riptide GP: Renegade",
  "Risk (game)": "RISK",
  "Ryū ga Gotoku Ishin!": "Yakuza Ishin!",
  "StarCraft II": "StarCraft II: Trilogy",
  "Trine 4": "Trine 4: The Nightmare Prince",
  Warspear: "Warspear Online",
  "Villagers & Heroes": "Villagers and Heroes",
  "Yakuza: Ishin": "Ryuu ga Gotoku Ishin!",
  "Zombie Tycoon 2": `Zombie Tycoon 2: Brainhov's Revenge`,
  'Warriors Orochi 3 Ultimate': 'Warriors Orochi 3: Ultimate',
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
// so we dont need to care about discrepancies in naming.
export const getGameDetailsMap = async (titles: string[]) => {
  // Get all the game details with their igdb name
  let igdbGames = await getGameDetails(titles.map(toIGDBName));

  const gamesNotFoundOnIGDB = [];

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
      gamesNotFoundOnIGDB.push(wikiTitle);
    }
    return acc;
  }, []);

  if(gamesNotFoundOnIGDB.length > 0) {
    const gameList = gamesNotFoundOnIGDB
      .map(wikiTitle => `"${wikiTitle}"`)
      .join(', ');
    throw new Error(
      `The following games with title from wikipedia could not be found on IGDB: ${gameList}`
    );
  }

  // return a map by game title
  return keyBy(games, (game) => game.title);
};
