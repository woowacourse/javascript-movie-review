/// <reference types="cypress" />

Cypress.Commands.add('visitMainPage', () => {
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('scrollBottom', () => {
  cy.get('.scroll-observer-target').scrollIntoView();
});

declare namespace Cypress {
  interface Chainable {
    visitMainPage(): Cypress.Chainable<void>;
    scrollBottom(): Cypress.Chainable<void>;
  }
}
