describe('fixture를 활용한 영화 리뷰 e2e 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getSearchMovies');
    cy.visit('/');
  });

  it('랜딩 페이지 접속 시 API 응답받아 영화 목록 20개를 보여준다.', () => {
    cy.wait('@getPopularMovies').then(interception => {
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });

  it('영화에는 포스터, 이름, 별점이 나온다.', () => {
    cy.get('.item-card').find('.item-title').should('be.visible');
    cy.get('.item-card').find('.item-thumbnail').should('be.visible');
    cy.get('.item-card').find('.item-score').should('be.visible');
  });
});
