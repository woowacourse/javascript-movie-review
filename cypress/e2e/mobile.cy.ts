describe('모바일 환경 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular-mock.json' }
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080/');
    cy.viewport('iphone-x');
  });

  it('헤더의 돋보기 버튼을 클릭하면 검색창이 보여진다.', () => {
    cy.get('.search-box').should('not.be.visible');

    cy.get('.mobile-search-box > .search-button').click();

    cy.get('.search-box').should('be.visible');
    cy.get('.mobile-search-box').should('not.be.visible');
  });
});
