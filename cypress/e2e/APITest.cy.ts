import { POPULAR_MOVIES_BASE_URL, MOVIE_SEARCH_BASE_URL, KEY } from '../../src/constants/MOVIES_URL';
import ResponseData from '../../src/interfaces/ResponseData';
import '../support/commands';

describe('API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const searchParamsURL = new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      page: '1',
    });

    const popularMoviesURL = POPULAR_MOVIES_BASE_URL + searchParamsURL;

    cy.request('GET', popularMoviesURL).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);

    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('검색창 입력시 검색 결과와 관련된 영화 목록을 호출해야 한다', () => {
    const searchParamsURL = new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      query: '해리 포터',
      page: `1`,
    });

    const movieSearchUrl = MOVIE_SEARCH_BASE_URL + searchParamsURL;

    cy.request('GET', movieSearchUrl).then((response) => {
      const data: ResponseData = response.body;

      data.results.forEach((movieData) => {
        expect(movieData.title).to.include('해리 포터');
      });
    });
  });
});
