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
  
    it ('더보기 버튼을 누르면 영화 리스트를 20개 추가되어 보여준다.', () => {
      cy.wait('@getPopularMovies').then(interception => {
        cy.get('.btn.primary.full-width').click();
        const popularMovieItems = cy.get('.item-list > li');
        expect(popularMovieItems.should('have.length', 40));
      })
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

    it('해리 포터 검색 후, 리스트를 전부 보여주면 더보기 버튼이 사라진다.', () => {
      cy.get('.search-box > input').type('해리 포터');
      cy.get('.search-box').submit();
  
      cy.wait('@getSearchMovies').then(() => {
        cy.get('.btn.primary.full-width').should('not.be.visible');
      })
    })
  })
});
