/// <reference types="cypress" />

Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
});

Cypress.Commands.add('addSearchInput', (input: string) => {
  cy.get('.search-box').get('input').type(input);
});

Cypress.Commands.add('submitSearchInput', () => {
  cy.get('.search-box').submit();
});

Cypress.Commands.add('testAPIWithFixture', (type: string, fixturePath: string) => {
  const url =
    type === 'popular'
      ? /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/
      : /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/;

  cy.intercept(
    {
      method: 'GET',
      url: url,
    },
    { fixture: fixturePath },
  );
});

Cypress.Commands.add('testAPIWithSingleMovie', (movieId: string, fixturePath: string) => {
  const url = new RegExp(`https?://api.themoviedb.org/3/movie/${movieId}*`);
  cy.intercept(
    {
      method: 'GET',
      url: url,
    },
    {
      fixture: fixturePath,
    },
  );
});

Cypress.Commands.add('verifyToastExists', (message: string) => {
  cy.get('div.toast', { timeout: 5000 }).should('be.visible').and('contain', message);
});

Cypress.Commands.add('verifyToastNotExists', () => {
  cy.get('div.toast', { timeout: 5000 }).should('not.be.visible');
});

Cypress.Commands.add('clickFirstMovieItem', () => {
  cy.wait(1000);
  const item = cy.get('ul.item-list > li').first();
  item.click();
  cy.wait(1000);
});

declare namespace Cypress {
  interface Chainable {
    visitHome(): Chainable<void>;
    addSearchInput(input: string): Chainable<Element>;
    submitSearchInput(): Chainable<Element>;
    testAPIWithFixture(type: string, fixturePath: string): Chainable<void>;
    testAPIWithSingleMovie(movieId: string, fixturePath: string): Chainable<void>;
    verifyToastExists(message: string): Chainable<void>;
    verifyToastNotExists(): Chainable<void>;
    clickFirstMovieItem(): Chainable<void>;
  }
}
