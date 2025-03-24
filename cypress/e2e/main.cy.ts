/// <reference types="cypress" />

describe('Fixture를 이용한 테스트', () => {
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
    it('검색어를 입력하고, 더보기 버튼을 누르면 아이템을 띄워줘야 한다.', () => {
      cy.get('.button--medium').click();

      cy.get('.item').should('have.length', 40);
    });
  });
});
