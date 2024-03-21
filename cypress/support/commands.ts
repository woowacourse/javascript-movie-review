declare namespace Cypress {
  interface Chainable {
    interceptMovieSearchAPI(): Chainable<any>;
    interceptPopularMovieAPI(): Chainable<any>;
  }
}

Cypress.Commands.add('interceptPopularMovieAPI', () => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
    },
    { fixture: 'movie-popular.json' },
  ).as('getPopularMovies');
});

Cypress.Commands.add('interceptMovieSearchAPI', () => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
    },
    { fixture: 'movie-search.json' },
  ).as('getSearchMovies');
});
