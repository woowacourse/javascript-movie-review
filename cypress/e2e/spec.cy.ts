describe('1. 영화 리뷰 미션 - 기능 동작 테스트', () => {
  it('[Load More] 버튼을 누르면, 영화들을 추가로 보여준다.', () => {
    cy.intercept(
      {
        url: `https://api.themoviedb.org/3/movie/popular?*`,
      },
      { fixture: 'popularMovies.json' },
    );
    cy.visit('/');

    cy.contains('Load More').click();

    cy.get('.item-list').children().should('have.length', 40);
  });

  it('Avatar를 검색하면, 해당 키워드를 가진 영화들을 보여준다.', () => {
    cy.intercept(
      {
        url: `https://api.themoviedb.org/3/3/search/movie?*`,
      },
      { fixture: 'searchedMovies.json' },
    );
    cy.visit('/');

    cy.get('#search-input').type('Avatar');
    cy.get('#search-button').click();

    cy.get('.item-view h2').should('contain', 'Search Results of "Avatar"');
    cy.get('.item-list').children().should('contain', 'Avatar');
  });
});
