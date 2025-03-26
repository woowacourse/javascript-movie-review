/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      search(title: string): Chainable<void>;
      waitLoading(): Chainable<void>;
      scrollBottom(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('search', (title: string) => {
  cy.waitLoading();
  cy.get('#top-rated-search-input').type(`${title}`);
  cy.get('.top-rated-search-button').click();
});
Cypress.Commands.add('waitLoading', () => {
  cy.get('.skeleton').should('not.exist');
});
Cypress.Commands.add('scrollBottom', () => {
  cy.get('#movie-more').scrollIntoView({ duration: 10 });
  cy.waitLoading();
});

Cypress.on('uncaught:exception', () => {
  return false;
});
