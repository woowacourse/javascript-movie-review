import { POPULAR_MOVIES_URL } from '../../src/api';

describe('데이터 fetching 시 에러 핸들링 테스트', () => {
  it('access-token 이 잘못되었을 때 401 과 "인증되지 않은 사용자 입니다" 라는 메세지를 띄워준다.', () => {
    const STATUS = 401;
    const ERROR_MESSAGE = '인증되지 않은 사용자 입니다';

    cy.intercept(
      {
        method: 'GET',
        url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
        headers: {
          Authorization: `Bearer ${Cypress.env('MOVIE_ACCESS_TOKEN')}`,
        },
      },
      {
        statusCode: STATUS,
        body: {
          message: ERROR_MESSAGE,
        },
      },
    );
    cy.visit('http://localhost:8080');

    cy.get('.error-message').should('have.text', ERROR_MESSAGE);
    cy.get('.status-number').should('have.text', STATUS);
  });

  it('없는 페이지의 경우 404 에러와 Not Found 라는 메세지를 화면에 보여준다.', () => {
    const STATUS = 404;
    const ERROR_MESSAGE = 'Not Found';
    cy.intercept(
      {
        method: 'GET',
        url: `${POPULAR_MOVIES_URL}?language=ko-KR&page=1`,
        headers: {
          Authorization: `Bearer ${Cypress.env('MOVIE_ACCESS_TOKEN')}`,
        },
      },
      {
        statusCode: STATUS,
        body: {
          message: ERROR_MESSAGE,
        },
      },
    );
    cy.visit('http://localhost:8080');

    cy.get('.error-message').should('have.text', ERROR_MESSAGE);
    cy.get('.status-number').should('have.text', STATUS);
  });
});
