import { MATCHED_MOVIES, POPULAR_MOVIES } from '../../src/constants/url';

describe('API test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('인기 영화 목록 API test', () => {
    it('인기 영화 목록 API를 호출하면 결과는 20개이다.', () => {
      const popularMovieUrl = `${POPULAR_MOVIES}?${new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: '1',
      })}`;

      cy.request('GET', popularMovieUrl).as('popularMovies');

      cy.get('@popularMovies').its('status').should('eq', 200);
      cy.get('@popularMovies').its('body.results').should('have.length', 20);
    });
  });

  context('영화 검색 API test', () => {
    it('영화 검색 API를 호출하면 검색 결과가 20개가 넘는 경우에 20개이다.', () => {
      const matchedMovieUrl = `${MATCHED_MOVIES}?${new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: '1',
        query: '쿵푸',
      })}`;

      cy.request('GET', matchedMovieUrl).as('popularMovies');

      cy.get('@popularMovies').its('status').should('eq', 200);
      cy.get('@popularMovies').its('body.results').should('have.length', 20);
    });
  });
});
