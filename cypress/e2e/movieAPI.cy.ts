/* eslint-disable max-lines-per-function */
describe('movieAPI 테스트', () => {
  it('TMDB API에 popular GET 요청을 하면 한번에 20개의 목록을 받아온다', () => {
    cy.visit('http://localhost:8080/#');

    const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular';
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: 1,
      });

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
    cy.get('@popularMovies').its('status').should('not.eq', 400);
    cy.get('@popularMovies').its('body.results').should('not.have.length', 21);
  });
});
