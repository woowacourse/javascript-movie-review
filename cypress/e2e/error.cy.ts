/// <reference types="cypress" />

describe('영화 리뷰 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('401 에러가 발생할 경우, 에러 메시지를 보여준다.', () => {});
});
