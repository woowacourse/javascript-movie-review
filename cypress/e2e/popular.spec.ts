import { REQUEST_URL } from '../../src/constants/requests';

describe('지금 인기있는 영화 목록 E2E 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const params = new URLSearchParams({
      api_key: Cypress.env('API_KEY'),
      language: 'ko-KR',
      page: '1',
    });

    const popularMovieUrl = `${REQUEST_URL.popularMovies}${params}`;

    cy.request('GET', popularMovieUrl).as('popularMovies');

    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});
