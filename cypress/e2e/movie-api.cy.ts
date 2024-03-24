import { BASE_URL, endPoint } from '../../src/config';
import { getPopularURL } from '../utils/createURL';

/* eslint-disable max-lines-per-function */
describe('영화 API 테스트', () => {
  it('인기 영화  리스트 요청 시 20개의 영화 목록을 받아온다', () => {
    const popularMovieUrl = `${BASE_URL}/${endPoint.popularMovie(1)}&${new URLSearchParams(
      {
        api_key: Cypress.env('TMDB_API_KEY'),
      },
    )}`;
    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('영화 검색 시 검색한 영화에 대한 정보를 한번에 최대 20개의 목록을 받아온다.', () => {
    cy.visit('http://localhost:8080');

    const searchMovieUrl = `${BASE_URL}/${endPoint.searchMovie('해리', 1)}&${new URLSearchParams(
      {
        api_key: Cypress.env('TMDB_API_KEY'),
      },
    )}`;

    cy.request('GET', searchMovieUrl).as('searchMovies');

    cy.get('@searchMovies').its('status').should('eq', 200);
    cy.get('@searchMovies').its('body.results').should('have.length', 20);
  });
});
