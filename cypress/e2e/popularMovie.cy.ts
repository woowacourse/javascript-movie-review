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
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get('.thumbnail-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });

  it('영화 제목이 올바르게 표시되어야 한다.', () => {
    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').first().contains('Snow White');
    cy.get('.thumbnail-list > li').eq(1).contains('The Twister: Caught in the Storm');
  });

  it('무한스크롤 테스트', () => {
    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').should('have.length', 20);

    cy.scrollTo('bottom', { duration: 500 });

    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').should('have.length', 40);
  });
});
