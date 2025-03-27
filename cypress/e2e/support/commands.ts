/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      searchMovie(keyword: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("searchMovie", (keyword: string) => {
  cy.get(".search-bar").clear().type(keyword);
  cy.get(".search-bar-button").click();
});
