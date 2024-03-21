/// <reference types="cypress" />

Cypress.Commands.add("visitMainPage", () => {
  cy.visit("http://localhost:8080/");
});

declare namespace Cypress {
  interface Chainable {
    visitMainPage(): Cypress.Chainable<void>;
  }
}
