/// <reference types="cypress" />

Cypress.Commands.add('visitMainPage', () => {
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('scrollBottom', () => {
  cy.get('.scroll-observer-target').scrollIntoView();
});

Cypress.Commands.add('clickFirstMovieCard', () => {
  cy.get('.movie-list-container').within(() => {
    cy.get('.movie-list').find('li').first().click();
  });
});
declare namespace Cypress {
  interface Chainable {
    visitMainPage(): Cypress.Chainable<void>;
    scrollBottom(): Cypress.Chainable<void>;
    clickFirstMovieCard(): Cypress.Chainable<void>;
  }
}
