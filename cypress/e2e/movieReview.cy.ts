describe('영화 리뷰 E2E 테스트', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  context('페이지 방문 테스트', () => {
    it('처음 페이지를 방문하면 스켈레톤 UI가 표시되어야 한다.', () => {
      cy.get('.item-list .item-card#item-card-skeleton').should('exist');
    });

    it('403 에러가 발생했을 때, "다시 시도하기" 모달이 표시되어야 한다.', () => {
      cy.generateAPIKeyError();

      cy.visit('/');
      cy.wait('@APIKeyError');

      cy.get('#error-fallback-modal').should('exist');
    });
  });

  context('인기순 영화 목록 확인 테스트', () => {
    it('영화 목록 API 요청에 성공하면 20개의 영화 정보가 목록에 나열되어야 한다.', () => {
      const popularMovieItems = cy.get('.item-list > li');

      expect(popularMovieItems.should('have.length', 20));
    });

    it('페이지를 스크롤하면 추가 영화 정보가 로드되어야 한다', () => {
      cy.get('.item-list > li').should('have.length', 20);

      cy.scrollTo('bottom');

      cy.get('.item-list > li').should('have.length', 40);

      cy.scrollTo('bottom');

      cy.get('.item-list > li').should('have.length', 60);
    });
  });

  context('검색 결과 확인 테스트', () => {
    it('검색어를 입력하지 않으면 에러 토스트 메시지가 표시되어야 한다.', () => {
      cy.get('#search-form').submit();

      cy.get('.toast').should('exist');
    });

    it('ㅋㅋ를 입력했을 때 "텅" 이미지와 함께 더 이상 영화 결과를 제공하지 않는다.', () => {
      cy.searchMovie('ㅋㅋ');

      cy.get('#movie-list-container > img').should('exist');

      cy.get('.item-list > li').should('have.length', 0);
    });

    it('검색어를 입력하면 검색된 영화가 표시되어야 한다.', () => {
      cy.searchMovie('쿵푸팬더');

      cy.get('.item-title').invoke('text').should('contains', '쿵푸팬더');
    });
  });

  context('영화 상세 정보 확인 테스트', () => {
    beforeEach(() => {
      cy.viewport(1920, 3000);
      cy.getPopularMovies();
    });

    it('댐즐을 클릭 했을 때 상세 정보 모달에서 영화 상세 정보를 확인할 수 있다.', () => {
      cy.visit('/');

      cy.wait('@getPopularMovies').then(() => {
        cy.get('#item-card').first().click();

        cy.get('#movie-review-detail-modal').should('be.visible');

        cy.get('#modal-review-detail-title').invoke('text').should('contains', '댐즐');

        cy.get('#movie-description-image')
          .should('have.attr', 'src')
          .and('include', '/1Ku5QqFIsn9UQaD72hdlJVeIC57.jpg');

        cy.get('#modal-close-button').should('be.visible');
      });
    });

    it('모달 버튼을 클릭했을 때 모달이 닫혀야 한다.', () => {
      cy.visit('/');

      cy.wait('@getPopularMovies').then(() => {
        cy.get('#item-card').first().click();
        cy.get('#modal-close-button').click();

        cy.get('#movie-review-detail-modal').should('not.be.visible');
      });
    });

    context('사용자 별점 매기기 기능 테스트', () => {
      it('댐즐의 초기 별점은 0점이며, "별점을 부여해주세요."라는 문구도 함께 확인할 수 있어야 한다.', () => {
        window.localStorage.setItem('763215', JSON.stringify({ title: '댐즐', ratingScore: 0 }));
        cy.visit('/');

        cy.wait('@getPopularMovies').then(() => {
          cy.get('#item-card').first().click();
          cy.get('#modal-close-button').click();

          cy.get('#movie-score-board-rating').invoke('text').should('equal', '0');
          cy.get('#movie-score-board-need-rating').invoke('text').should('equal', '별점을 부여해주세요.');
        });
      });

      const SCORE_GUIDE = [
        { score: 2, text: '최악이예요' },
        { score: 4, text: '별로예요' },
        { score: 6, text: '보통이에요' },
        { score: 8, text: '재미있어요' },
        { score: 10, text: '명작이에요' },
      ];

      SCORE_GUIDE.forEach(({ score, text }, index) => {
        it(`${index}번째 별을 클릭했을 때 점수는 ${score}이며 예상 문구는 '${text}'이며 새로고침 해도 유지 된다.`, () => {
          cy.visit('/');

          cy.wait('@getPopularMovies').then(() => {
            cy.get('#item-card').first().click();

            cy.get('.movie-score-board-stars img').eq(index).click();

            cy.get('#movie-score-board-rating').should('contain', score.toString());

            cy.get('#movie-score-board-need-rating').should('contain', text);

            cy.reload();

            cy.get('#item-card').first().click();

            cy.get('#movie-score-board-rating').should('contain', score.toString());

            cy.get('#movie-score-board-need-rating').should('contain', text);
          });
        });
      });
    });
  });
});
