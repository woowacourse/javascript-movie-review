describe('클라이언트 테스트', () => {
  beforeEach(() => {
    Array(4)
      .fill(null)
      .map((_, index) => index + 1)
      .forEach((page) => {
        cy.intercept(
          {
            method: 'GET',
            url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular/,
            query: {
              page: String(page),
            },
          },
          { fixture: `popular/page-${page}.json` },
        ).as('getPopularMovies');
      });

    Array(3)
      .fill(null)
      .map((_, index) => index + 1)
      .forEach((page) => {
        cy.intercept(
          {
            method: 'GET',
            url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie/,
            query: {
              query: 'Apple',
            },
          },
          { fixture: `search/Apple/page-${page}.json` },
        ).as('getSearchMovies');
      });

    Array(1)
      .fill(null)
      .map((_, index) => index + 1)
      .forEach((page) => {
        cy.intercept(
          {
            method: 'GET',
            url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie/,
            query: {
              query: '피터파커',
            },
          },
          { fixture: `search/짱구/page-${page}.json` },
        ).as('getSearchMovies');
      });

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+/,
      },
      { fixture: 'movie-detail.json' },
    ).as('getMovieDetail');

    cy.visit('/');
    cy.waitLoading();
  });

  describe('영화 목록 조회', () => {
    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
      cy.waitLoading();
      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('스크롤을 최하단으로 내리면 영화 목록을 20개씩 추가한다.', () => {
      cy.get('.thumbnail-list > li').should('have.length', 20);

      cy.get('#movie-more').scrollBottom();
      cy.get('.thumbnail-list > li').should('have.length', 40);

      cy.get('#movie-more').scrollBottom();
      cy.get('.thumbnail-list > li').should('have.length', 60);

      cy.get('#movie-more').scrollBottom();
      cy.get('.thumbnail-list > li').should('have.length', 60);
    });
  });

  describe('영화 검색', () => {
    it('검색을 했을 때, 20개 이상이라면 20개를 전부 보여준다.', () => {
      cy.search('Apple');
    });
    it('검색을 했을 때, 40개 이상이라면 스크롤을 최하단으로 내렸을 때 40개를 보여준다.', () => {
      cy.search('Apple');
      cy.get('#movie-more').scrollBottom();
      cy.get('.thumbnail-list > li').should('have.length', 40);
    });
  });

  describe('영화 상세정보 조회', () => {
    beforeEach(() => {
      cy.get('.thumbnail-list > li').first().click();
    });
    it('영화를 누르면 상세정보를 보여준다.', () => {
      cy.get('.my-rate > .sub-title').contains('내 별점').should('exist');

      cy.get('.main-info > h2').contains('극장판 짱구는 못말려: 우리들의 공룡일기');
      cy.get('.category').contains('2024 · 애니메이션, 모험, 코미디, 가족');
    });

    it('모달을 닫는 버튼을 클릭하면 상세 정보 모달을 제거한다.', () => {
      cy.get('#closeModal').click();
      cy.get('.my-rate > .sub-title').should('not.exist');
    });
  });
  describe('별점 매기기', () => {});
});
