import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// Return a list of games from the data_sync response
// { name: <name> }
const htmlFromPSResponse = (json) =>
  json.action_queue
    .filter((q) => q[0] === "html" || q[0] === "append_html")
    .map((q) => q[1])
    .find((q) => q.selector === "#all_games")?.value;

const fetchGamePage = async (pageNumber) => {
  const params = new URLSearchParams();
  params.append("page_num", pageNumber.toString());
  params.append("ajax_action", "filter_games");

  // Trick the PS Now data endpoint to giving us the games
  const result = await fetch("https://ps.playstation.com/psnow/data_sync", {
    method: "POST",
    body: params as any,
  });
  const json = await result.json();

  // Convert the html fragment to a JSDOM doc so we can query it
  const document = new JSDOM(htmlFromPSResponse(json)).window.document;

  // Get the titles from the H3 elements
  return Array.from(document.querySelectorAll("h3"))
    .map((titleEl) => titleEl.textContent.trim())
    .map((title) => ({ name: title }));
};

export const getPlaystationNowGames = async () => {
  let page = 1;
  let allGames = [];
  let games = [];
  do {
    games = await fetchGamePage(page);
    allGames = [...allGames, ...games];
    page++;
  } while (games.length);

  const EXPECTED_AMOUNT = 170;
  if (allGames.length < EXPECTED_AMOUNT)
    throw new Error(
      `Lower than expected amount of PSNow games found (${
        allGames.length
      } vs min of ${EXPECTED_AMOUNT})`
    );

  return allGames;
};
