import { POPULAR_MOVIES_URL } from '../../src/api';

describe('영화 목록 API 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('한 페이지의 인기 영화 목록을 불러왔을 때, 20개의 영화 목록이 나열된다.', () => {
    cy.request({
      method: 'GET',
      url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
      headers: {
        Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
      },
    }).as('popularMovies');

    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });

  it('잘못된 ACCESS_TOKEN을 보낼 시 401에러가 발생합니다.', () => {
    const WRONG_TOKEN = 'ABCD123';

    cy.request({
      method: 'GET',
      url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
      headers: {
        Authorization: `Bearer ${WRONG_TOKEN}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('잘못된 페이지를 보낼 시 400에러가 발생합니다.', () => {
    const WRONG_PAGE = 0;

    cy.request({
      method: 'GET',
      url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=${WRONG_PAGE}`,
      headers: {
        Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
