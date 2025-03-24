/// <reference types="cypress" />

describe('Fixture를 이용한 초기화면 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.visit('http://localhost:5173');

    cy.wait('@getPopularMovies').then((interception) => {
      expect(interception.response!.body.results).to.have.length(20);
    });
  });

  it('초기화면에서 인기 영화 목록이 20개 렌더링이 되어야 한다.', () => {
    cy.get('.item').should('have.length', 20);
  });

  it('더보기 버튼을 누를 경우, 20개의 작품이 더 렌더링된다', () => {
    cy.get('.button--full').click();

    cy.get('.item').should('have.length', 40);
  });
});
