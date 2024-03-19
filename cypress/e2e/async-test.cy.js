const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular';

describe('API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  // https://docs.cypress.io/api/commands/request
  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'), // cypress.env.json
        language: 'ko-KR',
        page: 1,
      });

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});
