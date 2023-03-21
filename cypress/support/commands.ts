declare namespace Cypress {
  interface Chainable {
    visitByDesktop(): void;

    getPopularMovieData(): void;
    getSearchedMovieData(): void;

    clickMainLogo(): void;
    clickMoreButton(): void;
    triggerSearchBoxSubmit(): void;

    checkSkeletonListShow(): void;
    checkSkeletonListHide(): void;

    getMovieCards(): Chainable<JQuery<HTMLElement>>;
    getTitleOfMovieCards(): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('visitByDesktop', () => {
  cy.viewport(1920, 1080);
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('getPopularMovieData', () => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture: 'TMDBPopular.json', delay: 300 }
  ).as('getPopularMovieData');
});

Cypress.Commands.add('getSearchedMovieData', () => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
    },
    { fixture: 'TMDBSearched.json', delay: 300 }
  ).as('getSearchedMovieData');
});

Cypress.Commands.add('clickMainLogo', () => {
  cy.get('.main-logo').click();
});

Cypress.Commands.add('clickMainLogo', () => {
  cy.get('#more-button').click();
});

Cypress.Commands.add('triggerSearchBoxSubmit', () => {
  cy.get('.search-box').submit();
});

Cypress.Commands.add('checkSkeletonListShow', () => {
  cy.get('.skeleton-item-list').should('not.have.class', 'hide');
});

Cypress.Commands.add('checkSkeletonListHide', () => {
  cy.get('.skeleton-item-list').should('have.class', 'hide');
});

Cypress.Commands.add('getMovieCards', () => {
  cy.get('.item-list').not('.skeleton-item-list').children();
});

Cypress.Commands.add('getTitleOfMovieCards', () => {
  cy.get('.item-title').not('.skeleton');
});
