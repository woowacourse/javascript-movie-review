type APIType = 'matched' | 'popular';

interface InterceptAPIProps {
  type: APIType;
  delay?: number;
  statusCode?: number;
}

const POPULAR_MOVIES_REQUEST = {
  method: 'GET',
  url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
};
const MATCHED_MOVIES_REQUEST = {
  method: 'GET',
  url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
};

Cypress.Commands.add('searchMovie', (query: string) => {
  cy.get('input').type(`${query}{enter}`);
});

Cypress.Commands.add('interceptAPI', ({ type, delay, statusCode }: InterceptAPIProps) => {
  if (type === 'matched')
    cy.intercept(MATCHED_MOVIES_REQUEST, { fixture: 'movie-matched.json', delay, statusCode });
  if (type === 'popular')
    cy.intercept(POPULAR_MOVIES_REQUEST, { fixture: 'movie-popular.json', delay, statusCode });
});

declare namespace Cypress {
  interface Chainable {
    searchMovie(query: string): Chainable<void>;
    interceptAPI({ type, delay, statusCode }: InterceptAPIProps): Chainable<void>;
  }
}
