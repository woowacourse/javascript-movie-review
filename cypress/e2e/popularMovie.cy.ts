/// <reference types="cypress" />

describe('영화 목록 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies');

    cy.visit('http://localhost:5173');
  });

  it('영화 목록이 20개 렌더링되어야 한다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const popularMovies = interception?.response?.body.results;
      cy.wrap(popularMovies).should('have.length', 20);

      cy.get('.thumbnail-list > li').should('have.length', 20);
    });
  });

  it('영화 제목이 올바르게 표시되어야 한다.', () => {
    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').first().contains('Snow White');
    cy.get('.thumbnail-list > li').eq(1).contains('The Twister: Caught in the Storm');
  });

  it('"더보기" 버튼을 클릭하면 추가 영화가 로드되어야 한다.', () => {
    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').should('have.length', 20);

    cy.get('#moreButton').click();

    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').should('have.length', 40);
  });
});
