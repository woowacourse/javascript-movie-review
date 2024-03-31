describe('영화 리스트 E2E 테스트', () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
    ).as('getPopularMovies');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
    ).as('getSearchMovies');

    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d/,
    }).as('getDetailMovie');

    cy.visit('http://localhost:8080');
  });

  context('인기 있는 영화 View 테스트', () => {
    it ('인기 있는 영화가 로딩될 때는 skeleton UI를 20개 보여준다.', () => {
      const popularMovieItems = cy.get('.item-list > li.skeleton');
      expect(popularMovieItems.should('have.length', 20));
      cy.wait('@getPopularMovies')
    });
  
    it ('인기 있는 영화가 로딩 된 후에는 skeleton UI가 다 사라지고 영화 리스트를 20개 보여준다.', () => {
      cy.wait('@getPopularMovies').then(interception => {
        const popularMovieItemsSkeleton = cy.get('.item-list > li.skeleton');
        expect(popularMovieItemsSkeleton.should('have.length', 0));
  
        const popularMovieItems = cy.get('.item-list > li');
        expect(popularMovieItems.should('have.length', 20));
      })
    });

    it ('하단으로 스크롤 하면 영화 리스트를 20개 추가되어 보여준다.', () => {
      cy.wait('@getPopularMovies').then(interception => {
        cy.scrollTo('bottom');
        const popularMovieItems = cy.get('.item-list > li');
        expect(popularMovieItems.should('have.length', 40));
      })
    });
    
    it('고질라 X 콩: 뉴 엠파이어를 클릭하면 고질라 X 콩: 뉴 엠파이어 영화의 상세 정보를 조회할 수 있다.', () => {
      const movieTitle = '고질라 X 콩: 뉴 엠파이어';
  
      cy.wait('@getPopularMovies').then(popular => {
        cy.get('.item-list > li').first().click();
  
        cy.wait('@getDetailMovie').then(interception => {
          const movieDetailTitle = cy.get('.modal--open').get('.modal-title');
          expect(movieDetailTitle.should('have.text', movieTitle));
        });
      });
    });
  })


  
  context('검색어 기반 영화 리스트 테스트', () => {
    it('해리 포터 검색 후, 검색어 기반 영화 리스트를 보여준다.', () => {
      
      cy.get('.search-box > input').type('해리 포터');
      cy.get('.search-box').submit();
  
      cy.wait('@getSearchMovies').then(() => {
        const searchMovieItems = cy.get('.item-list > li');
        searchMovieItems.each($movie => {
          cy.wrap($movie).find('.item-title').should('contain', '해리 포터');
        });
      })
    })

    it('해리 포터 검색 후, 리스트를 전부 보여주면 하단으로 스크롤해도 추가로 영화를 가져오지 않는다.', () => {
      cy.get('.search-box > input').type('해리 포터');
      cy.get('.search-box').submit();
  
      cy.wait('@getSearchMovies').then(() => {
        cy.scrollTo('bottom');
        const searchMovieItems = cy.get('.item-list > li');
        expect(searchMovieItems.should('have.length', 10));
      })
    })
  })
});
