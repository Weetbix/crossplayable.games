context("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the most loved games", () => {
    cy.contains("Most Loved Games");

    cy.get('[data-testid="most-loved-games"')
      .find("a")
      .should("have.length", 3);
  });

  it("should render the most recent games", () => {
    cy.contains("Most Recent Games");

    cy.get('[data-testid="most-recent-games"')
      .find("a")
      .should("have.length", 3);
  });

  it("should take you to that games page when clicking a game", () => {
    cy.get('[data-testid="most-loved-games"').find("a").first().click();

    cy.location("pathname").should("include", "/games/does");
  });
});
