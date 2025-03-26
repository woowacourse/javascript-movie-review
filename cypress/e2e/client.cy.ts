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

        cy.get('.skeleton-thumbnail-list').should('not.exist');
        cy.get('.thumbnail-list > li').should('have.length', 20);
      });
    });

    it('스크롤을 최하단으로 내리면 영화 목록을 20개씩 추가한다.', () => {
      cy.wait('@getPopularMovies').then((interception) => {
        if (!interception.response) return;

        cy.get('.skeleton-thumbnail-list').should('not.exist');
        cy.get('.thumbnail-list > li').should('have.length', 20);

        cy.get('#movie-more').scrollIntoView({ duration: 10 });
        cy.get('.skeleton-thumbnail-list').should('not.exist');
        cy.get('.thumbnail-list > li').should('have.length', 40);

        cy.get('#movie-more').scrollIntoView({ duration: 10 });
        cy.get('.skeleton-thumbnail-list').should('not.exist');
        cy.get('.thumbnail-list > li').should('have.length', 60);

        cy.get('#movie-more').scrollIntoView({ duration: 10 });
        cy.get('.skeleton-thumbnail-list').should('not.exist');
        cy.get('.thumbnail-list > li').should('have.length', 60);
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
