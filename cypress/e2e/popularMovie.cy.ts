/// <reference types="cypress" />

describe('인기있는 영화 목록 조회 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/popular?*', {
      fixture: 'popularMovie.json',
    }).as('getPopular');
  });

  it('페이지에 처음 접근했을 경우, 스켈레톤이 보인 후 20개의 영화 리스트들을 볼 수 있다.', () => {
    cy.get('.skeleton-item').should('have.length', 20);
    cy.get('ul.thumbnail-list').should('exist');

    cy.get('ul.thumbnail-list').children().should('have.length', 20);
  });

  it('더보기 버튼을 누르면 스켈레톤이 보이고, 기존 데이터에 20개가 더 추가된 데이터를 보여준다.', () => {
    cy.get('.skeleton-item').should('have.length', 20);
    cy.get('.moreBtn').should('be.visible').click();

    cy.get('.skeleton-item').should('have.length', 20);

    cy.get('.skeleton-item').should('not.exist');
    cy.get('ul.thumbnail-list').children().should('have.length', 40);
  });
});
