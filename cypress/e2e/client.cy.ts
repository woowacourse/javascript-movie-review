describe('클라이언트 테스트', () => {
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
      { fixture: 'movie-search.json' },
    ).as('getSearchMovies');

    cy.visit('/');
  });
  describe('영화 목록 조회', () => {
    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
      cy.wait('@getPopularMovies').then((interception) => {
        if (!interception.response) return;

        cy.waitLoading();
        cy.get('.thumbnail-list > li').should('have.length', 20);
      });
    });

    it('스크롤을 최하단으로 내리면 영화 목록을 20개씩 추가한다.', () => {
      cy.wait('@getPopularMovies').then((interception) => {
        if (!interception.response) return;

        cy.get('.thumbnail-list > li').should('have.length', 20);

        cy.get('#movie-more').scrollBottom();
        cy.get('.thumbnail-list > li').should('have.length', 40);

        cy.get('#movie-more').scrollBottom();
        cy.get('.thumbnail-list > li').should('have.length', 60);

        cy.get('#movie-more').scrollBottom();
        cy.get('.thumbnail-list > li').should('have.length', 60);
      });
    });
  });

  describe('영화 검색', () => {
    it('검색을 했을 때, 20개 이상이라면 20개를 전부 보여준다.', () => {
      cy.search('짱구');
    });
    it('검색을 했을 때, 40개 이상이라면 스크롤을 최하단으로 내렸을 때 40개를 보여준다.', () => {
      cy.search('짱구');
      cy.get('#movie-more').scrollBottom();
      cy.get('.thumbnail-list > li').should('have.length', 40);
    });
  });

  describe('영화 상세정보 조회', () => {});
  describe('별점 매기기', () => {});
});
