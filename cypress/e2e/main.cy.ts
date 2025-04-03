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

  it('인기 영화 목록이 20개 렌더링이 되어야 한다.', () => {
    cy.get('.item').should('have.length', 20);
  });

  it('검색 결과가 없을 경우 에러메세지 출력', () => {});
});
