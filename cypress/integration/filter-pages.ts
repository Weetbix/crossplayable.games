const TOTAL_GAMES_REGEX = /^(\d*) games support crossplay on these platforms.*/;

context("Filter pages", () => {
  const cases = [
    ["Windows", 135, "/windows"],
    ["Linux", 26, "/linux"],
    ["Mac", 44, "/mac"],
    ["Switch", 54, "/switch"],
    ["PS3", 44, "/ps3"],
    ["PS4", 115, "/ps4"],
    ["PS Now", 29, "/psnow"],
    ["Xbox", 75, "/xbox"],
    ["Gamepass", 16, "/gamepass"],

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
