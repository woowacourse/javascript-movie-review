/// <reference types="cypress" />
import 'cypress-wait-until';

describe('영화 리뷰 E2E test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport('macbook-13');
  });

  it('더 보기 버튼을 통해 영화 목록을 더 불러올 수 있다', () => {
    cy.waitUntil(() => cy.get('.item-card.movie')).then(() => {
      cy.get('button').contains('더 보기').click();
    });

    cy.get('.item-card.movie').should('have.length', 40);
  });
});
