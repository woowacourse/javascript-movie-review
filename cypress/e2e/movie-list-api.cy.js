import { POPULAR_MOVIES_URL } from "../../src/api";

describe('영화 목록 API 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })
  it('한 페이지의 인기 영화 목록을 불러왔을 때, 20개의 영화 목록이 나열된다.', () => {
    cy.request({
      method: 'GET',
      url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
      headers:{
        Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`
      },
    }).as('popularMovies');

    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  })
})