describe('클라이언트 테스트', () => {
  describe('영화 목록 조회', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        { fixture: 'movie-popular.json' },
      ).as('getPopularMovies');

      cy.visit('/');
    });

    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
      cy.wait('@getPopularMovies').then((interception) => {
        if (!interception.response) return;

        const popularMovieItems = cy.get('.thumbnail-list > li');
        expect(popularMovieItems.should('have.length', 20));
      });
    });

    it('사용자가 더 보기를 누르면 다음 목록을 보여준다.', () => {
      cy.wait('@getPopularMovies').then((interception) => {
        if (!interception.response) return;

        cy.get('[data-action="show-more"]').click();

        const popularMovieItems = cy.get('.thumbnail-list > li');
        expect(popularMovieItems.should('have.length', 40));
      });
    });
  });

  describe('영화 검색', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
        },
        { fixture: 'movie-search.json' },
      ).as('getSearchMovies');

      cy.visit('/');
    });
  });
});
