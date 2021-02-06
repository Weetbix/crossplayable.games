context("Game pages", () => {
  beforeEach(() => {
    cy.visit("games/does-aragami-support-crossplay");
  });

  it("should show the platforms the game is available on", () => {
    cy.get(
      '[aria-description="Aragami supports crossplay on the these platoforms"]'
    ).within(() => {
      cy.contains("Linux");
      cy.contains("Mac");
      cy.contains("Switch");
      cy.contains("PSNow");
      cy.contains("Xbox");
      cy.contains("Windows");
    });
  });

  it("should show all the correct data from igdb", () => {
    cy.contains("Single player, Multiplayer, Co-operative");
    cy.contains(
      "Aragami is a third person stealth game that casts you as an undead assassin"
    );
    cy.contains(
      "You are Aragami, a vengeful spirit with the power to control the shadows"
    );
    cy.contains("Adventure");
    cy.contains("Indie");
    cy.contains("Merge Games");
    cy.contains("Lince Works");
    cy.contains("Action");
    cy.contains("Stealth");
    cy.contains("Developer: Lince Works");
    cy.contains("Released Tue Oct 04 2016");
  });
});
