const TOTAL_GAMES_REGEX = /^(\d*) games support crossplay on these platforms.*/;

context("Filter pages", () => {
  const cases = [
    ["Windows", 190, "/windows"],
    ["Linux", 33, "/linux"],
    ["Mac", 52, "/mac"],
    ["Switch", 72, "/switch"],
    ["PS3", 44, "/ps3"],
    ["PS4", 144, "/ps4"],
    ["PS5", 142, "/ps5"],
    ["Playstation Plus", 20, "/playstationplus"],
    ["Xbox", 121, "/xbox"],
    ["Gamepass", 25, "/gamepass"],

    // Test cases for multiple platforms combined
    ["2x combination", 47, "switch/windows"],
    ["3x combination", 21, "switch/ps4/windows"],
    ["4x combination", 17, "/switch/xbox/ps4/windows"],
  ];

  cases.forEach(([name, minGames, path]: [string, number, string]) => {
    it(`should have at least ${minGames} games on the ${name} page`, () => {
      cy.visit(path);

      cy.get('[data-testid="total-games-support"]').should(($span) => {
        const text = $span.text();
        const match = text.match(TOTAL_GAMES_REGEX);
        expect(parseInt(match[0])).to.be.gte(minGames);
      });
      cy.get('[data-testid="game-results"')
        .find("a")
        .should("have.length.at.least", minGames);
    });
  });
});
