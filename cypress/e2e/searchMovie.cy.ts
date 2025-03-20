/// <reference types="cypress" />

describe('검색 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/popular?*', {
      fixture: 'popularMovie.json',
    }).as('getPopular');

    cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie?*', {
      fixture: 'searchMovie.json',
      // delay 함수를 우회하기 위해 응답 지연 설정
      delay: 3500,
    }).as('getSearchMovie');
  });

  it('검색창에 검색어를 입력하면 스켈레톤을 보여준 후 검색 데이터를 보여준다.', () => {
    // 먼저 인기 영화 로딩 대기
    cy.wait('@getPopular');

    // 검색어 입력 및 검색 실행
    cy.get('#search-input').type('해리포터');
    cy.get('.search-bar').click();

    // 스켈레톤 확인
    cy.get('.skeleton-item').should('have.length', 20);

    // 검색 API 응답 대기
    cy.wait('@getSearchMovie');

    // 스켈레톤이 사라질 때까지 충분히 기다림 (내부 delay 함수가 3000ms)
    cy.get('.skeleton-item', { timeout: 5000 }).should('not.exist');

    // 영화 아이템 확인
    cy.get('.movie-item', { timeout: 5000 }).should('have.length', 9);
  });

  it('검색 결과가 없을 경우 검색 결과가 없다는 메시지를 보여준다.', () => {});
});
