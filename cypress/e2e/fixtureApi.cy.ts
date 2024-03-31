describe('영화 API fixture 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: /https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/ },
      { fixture: 'movie_many.json' },
    ).as('getTwentyMovies');
  });
  it('메인화면을 방문하여 20개의 fixture응답을 받았을 때、20개의 영화목록을 화면에 보여준다. ', () => {
    cy.visit('/');

    cy.wait('@getTwentyMovies').then(interception => {
      if (interception.response === undefined) return;
      const popularMovies = interception.response.body.results;
      if (popularMovies === undefined || popularMovies === null) return;
      expect(popularMovies).to.have.length(20);

      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });
});
