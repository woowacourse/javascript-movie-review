import { POPULAR_MOVIES_URL } from '../../src/api';

describe('영화 목록 API 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
        headers: {
          Authorization: `Bearer ${Cypress.env('MOVIE_ACCESS_TOKEN')}`,
        },
      },
      {
        fixture: 'popular-movies.json',
      },
    ).as('popularMovies');
    cy.visit('http://localhost:8080');
  });

  it('영화 목록 API 호출 시 첫 페이지라면 20개의 데이터를 가져온다.', () => {
    cy.wait('@popularMovies').then((res) => {
      const movieData = res.response.body.results;
      expect(movieData.length).to.equal(20);
    });
  });
});
