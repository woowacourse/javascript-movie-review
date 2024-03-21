import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../src/constants/DTO';
import IRespondData from '../../src/interfaces/IRespondData';
import '../support/commands';

describe('API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: `1`,
      });
    cy.request('GET', popularMovieUrl).as('popularMovies');
    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('검색창 입력시 검색 결과와 관련된 영화 목록을 호출해야 한다', () => {
    const searchMovieUrl =
      MOVIE_SEARCH_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        query: '해리 포터',
        page: `1`,
      });
    cy.request('GET', searchMovieUrl).then((response) => {
      const data: IRespondData = response.body;

      data.results.forEach((movieData) => {
        expect(movieData.title).to.include('해리 포터');
      });
    });
  });
});
