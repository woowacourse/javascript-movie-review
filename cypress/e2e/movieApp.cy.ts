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

  it('검색창을 통해 검색이 가능하다', () => {
    cy.waitUntil(() => cy.get('.item-card.movie')).then(() => {
      cy.get('.search-form > input').type('업');
      cy.get('.search-form').submit();
    });

    cy.get('.item-card.movie').should('have.length', 20).should('contain.text', '업');
  });

  it('로고를 클릭 시 홈 화면으로 라우팅 한다', () => {
    cy.waitUntil(() => cy.get('.item-card.movie')).then(() => {
      cy.get('img[alt="MovieList 로고"]').click();
    });

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
  });
});
