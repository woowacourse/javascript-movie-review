import { MOVIE_API_URL } from '../../src/constants/url';

describe('영화 상세보기 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const movieId = 1011985;
    const params = `/${movieId}?language=ko-KR`;
    const movieDetailUrl = MOVIE_API_URL + params;

    cy.request({
      url: movieDetailUrl,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
        accept: 'application/json',
      },
    }).as('detailMovies');

    cy.get('@detailMovies').its('status').should('eq', 200);
    cy.get('@detailMovies').its('body').should('have.a.property', 'poster_path');
  });
});
