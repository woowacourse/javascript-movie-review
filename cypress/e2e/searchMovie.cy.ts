/// <reference types="cypress" />

describe('검색 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/popular?*', {
      fixture: 'popularMovie.json',
    }).as('getPopular');
  });

  it('검색창에 검색어를 입력하면 스켈레톤을 보여준 후 검색 데이터를 보여준다.', () => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie?*', {
      fixture: 'searchMovie.json',
    }).as('getSearchMovie');

    cy.wait('@getPopular');

    cy.get('.search-input').type('해리포터');
    cy.get('.search-bar').click();

    cy.wait('@getSearchMovie');

    cy.get('.skeleton-item').should('have.length', 20);

    cy.wait(3000);

    cy.get('.skeleton-item').should('not.exist');
    cy.get('.movie-item').should('have.length', 9);
  });

  it('검색 결과가 없을 경우 검색 결과가 없다는 메시지를 보여준다.', () => {
    cy.wait('@getPopular');

    cy.wait(3000);

    cy.get('.search-input').type('세라랑 메리랑 페어 ㅎ.ㅎ');
    cy.get('.search-bar').click();

    cy.get('.result-container')
      .contains('검색 결과가 없습니다.')
      .should('exist');
  });
});
