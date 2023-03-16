/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    mockPopularMovies(movieCount: number): Chainable<void>;
  }
}

Cypress.Commands.add('mockPopularMovies', (movieCount) => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture: `movies${movieCount}.json` }
  ).as('getPopularMovies');
});
