import movieApi from '../fixtures/movie-list-api.json';

describe('API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl =
      movieApi.POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: 1,
      });

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);

  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const searchMovieUrl =
      movieApi.MOVIE_SEARCH_URL +
      '?' +
      new URLSearchParams({
        query: '해리 포터',
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: 1,
      });

    cy.request('GET', searchMovieUrl).as('searchMovies');

    cy.get('@searchMovies').its('status').should('eq', 200);
    cy.get('@searchMovies').then(response => {
      const movies = response.body.results;
  
      movies.forEach(movie => {
        expect(movie.title.toLowerCase()).to.include('해리 포터');
      });
    });
  });
});