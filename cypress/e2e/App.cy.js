import ratingMessages from '../fixtures/rating-messages.json';

describe('영화 리스트 E2E 테스트', () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept
    cy.intercept({
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      }).as('getPopularMovies');

    cy.intercept({
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      }).as('getSearchMovies');

    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d/,
    }).as('getDetailMovie');

    cy.viewport(1920, 1080);
    cy.visit('http://localhost:8080');
  });

  context('인기 있는 영화 View 테스트', () => {
    it ('인기 있는 영화가 로딩될 때는 skeleton UI를 20개 보여준다.', () => {
      const popularMovieItems = cy.get('.item-list > li.skeleton-list');
      expect(popularMovieItems.should('have.length', 20));
      cy.wait('@getPopularMovies')
    });
  
    it('인기 있는 영화가 로딩 된 후에는 skeleton UI가 다 사라지고 영화 리스트를 20개 보여준다.', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.get('.item-list > li.skeleton-list.hidden').should('have.length', 20);
        cy.get('.item-list > li.movie-list').should('have.length', 20);
      });
    });

    it ('하단으로 스크롤 하면 영화 리스트 20개가 추가되어 보여준다.', () => {
      cy.wait('@getPopularMovies').then(interception => {
        cy.scrollTo('bottom');
        const popularMovieItems = cy.get('.item-list > li.movie-list');
        expect(popularMovieItems.should('have.length', 40));
      })
    });
  })
  
  context('검색어 기반 영화 리스트 테스트', () => {
    it('검색 키워드 입력 후, 검색어 기반 영화 리스트를 보여준다.', () => {
      cy.get('.search-box > input').type('해리 포터');
      cy.get('.search-box').submit();
  
      cy.wait('@getSearchMovies').then(() => {
        const searchMovieItems = cy.get('.item-list > li.movie-list');
        searchMovieItems.each($movie => {
          cy.wrap($movie).find('.item-title').should('contain', '해리 포터');
        });
      })
    });

    it ('모든 결괏값이 보여지면 스크롤을 해도 더 이상 데이터가 추가되지 않는다.', () => {
      cy.get('.search-box > input').type('해리 포터');
      cy.get('.search-box').submit();
      
      cy.wait('@getPopularMovies').then(interception => {
        cy.scrollTo('bottom');
        const searchMovieItems = cy.get('.item-list > li.movie-list');
        expect(searchMovieItems.should('have.length', 10));
      })
    });
  })

  context('영화 상세 모달 테스트', () => {
    it('각 영화의 썸네일을 누르면 영화 상세 모달이 뜬다.', () => {
      const movieTitle = '쿵푸팬더 4';

      cy.wait('@getPopularMovies').then(() => {
        cy.get('.item-list > li.movie-list').eq(1).click();

        cy.wait('@getDetailMovie').then(interception => {
          const movieDetailTitle = cy.get('.modal.visible').get('.detail-title');
          expect(movieDetailTitle.should('have.text', movieTitle));
        });
      });
    });

    it('영화 상세 모달에서 별을 누르면 그에 해당하는 평점과 텍스트가 표시된다.', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.get('.item-list > li.movie-list').eq(1).click();
  
        cy.wait('@getDetailMovie').then(() => {
          cy.get('.detail-stars > img').each(($star, index) => {
            const voteNumber = (index+1) * 2; 
            const voteText = ratingMessages[voteNumber.toString()]; 
  
            cy.wrap($star).trigger('click');
            cy.get('.detail-vote-number').should('have.text', voteNumber.toString());
            cy.get('.detail-vote-text').should('have.text', voteText);
          });
        });
      });
    });

    it('x 버튼을 누르면 모달이 사라진다.', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.get('.item-list > li.movie-list').eq(1).click();

        cy.wait('@getDetailMovie').then(interception => {
          cy.get('.close-btn').click();
          cy.get('.modal').should('not.exist');
        });
      });
    });
  })
});
