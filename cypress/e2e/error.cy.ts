/// <reference types="cypress" />

describe('영화 리뷰 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.intercept(
      {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?*',
      },
      {
        statusCode: 401,
      },
    ).as('getError');
  });

  it('401 에러가 발생했을 경우 에러 메시지를 보여준다.', () => {
    cy.wait(1000);
    cy.get('@getError').its('response.statusCode').should('eq', 401);
    cy.get('.toast').should('exist');
    cy.get('.toast p').should(
      'have.text',
      '🔒 인증되지 않은 요청입니다. 로그인 후 이용해주세요. 🔒',
    );
  });
});
