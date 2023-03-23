Cypress.Commands.add("initMovieList", () => {
  cy.get("movie-card").should("have.length", 20);

  cy.get("more-button").click();
  cy.get("movie-card").should("have.length", 40);
});

Cypress.Commands.add("searchMovie", (input) => {
  cy.get(".search-box input").type(input);
  cy.get(".search-button").click();
  cy.get("movie-card").should("be.visible").contains(input);

  cy.get("more-button").click();
  cy.get("movie-card").should("be.visible").contains(input);
});

Cypress.Commands.add("searchLessThan20Movies", (input) => {
  cy.get(".search-box input").type(input);
  cy.get(".search-button").click();
  cy.get(".more-button").should("not.exist");
});
