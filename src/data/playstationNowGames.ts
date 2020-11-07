import { GatsbyNode } from "gatsby";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const PSNOW_URL =
  "https://www.playstation.com/en-us/ps-now/ps-now-games/#all-ps-now-games";

export const getPlaystationNowGames = async () => {
  const result = await fetch(PSNOW_URL);
  const document = new JSDOM(await result.text()).window.document;

  const games = Array.from(
    document.querySelectorAll(".tabs-content p:not(:first-child)")
  )
    .map((titleLi) => titleLi.textContent.trim())
    .map((title) => ({ name: title }));

  if (games.length < 800)
    throw new Error(
      `Lower than expected amount of PSNow games found (${
        games.length
      } vs min of ${800})`
    );

  return games;
};
