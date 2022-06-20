import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const PS_PLUS_GAMES_PAGE =
  "https://www.playstation.com/en-us/ps-plus/games/";

// The site duplicates games and puts (PS4) etc at the end.
// Get rid of that. Also sometimes has a * at the end.
const sanitizeName = name => name
  .replace(/\*$/,'')
  .replace(/\(PS[12345]\)$/,'')
  .trim();

export const getPlaystationPlusGames = async () => {
  const result = await fetch(PS_PLUS_GAMES_PAGE);
  const document = new JSDOM(await result.text()).window.document;

  const gameTitles = [
    // Big collection A-Zs
    ...Array.from(document.querySelectorAll(`.tabs-content p.txt-style-base`)),
    // Special "The PlayStation Plus Collection" section at the bottom
    ...Array.from(document.querySelectorAll(`.cmp-experiencefragment--the-playstation-plus-collection p`)),
    ]
    .map(nameParagraph => nameParagraph.textContent.trim())
    .map(sanitizeName);

  // Because some games had (PS3) etc appended, we should
  // make sure the list is unique after santizing them
  const games = [
    ...Array.from(new Set(gameTitles))
  ].map((title) => ({ name: title }));

  const EXPECTED_AMOUNT = 810;
  if (games.length < EXPECTED_AMOUNT)
    throw new Error(
      `Lower than expected amount of PS Plus games found (${
        games.length
      } vs min of ${EXPECTED_AMOUNT})`
    );

  return games;
};
