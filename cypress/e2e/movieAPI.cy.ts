/* eslint-disable max-lines-per-function */
describe('movieAPI 테스트', () => {
  it('TMDB API에 popular GET 요청을 하면 한번에 20개의 목록을 받아온다', () => {
    cy.visit('http://localhost:8080/#');

    const popularMovieUrl = `${Cypress.env('POPULAR_MOVIES_URL')}?${new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      page: '1',
    })}`;

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('TMDB API에 search GET 요청을 하면 검색한 영화에 대한 정보를 한번에 최대 20개의 목록을 받아온다.', () => {
    cy.visit('http://localhost:8080/#');

    const popularMovieUrl = `${Cypress.env('SEARCH_MOVIES_URL')}?${new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      page: '1',
      query: '해리',
    })}`;

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});
