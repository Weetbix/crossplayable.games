import { GatsbyNode } from "gatsby";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const PSNOW_URL =
  "https://www.playstation.com/en-us/explore/playstation-now/games/#allgames";

export const getPlaystationNowGames = async () => {
  const result = await fetch(PSNOW_URL);
  const document = new JSDOM(await result.text()).window.document;

  return Array.from(document.querySelectorAll("#games-block li.game-title"))
    .map((titleLi) => titleLi.textContent.trim())
    .map((title) => ({ name: title }));
};
