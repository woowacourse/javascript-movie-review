import '../support/commands';

describe('Fixture를 이용한 MovieDetailModal 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.+1$/,
      },
      { fixture: 'movie-popular-page1.json' },
    ).as('getPopularMoviesPage1');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/.+language=ko-KR$/,
      },
      { fixture: 'movie-detail.json' },
    ).as('getMovieDetail');

    cy.visit('http://localhost:8080');
  });

  it('영화 포스터를 누르면 영화 상세 정보 모달이 등장해야 한다.', () => {
    cy.wait('@getPopularMoviesPage1').then(() => {
      cy.get('li').first().click();
    });
    cy.wait('@getMovieDetail').then(() => {
      cy.get('.modal-header-title').should('contain', '고질라 X 콩: 뉴 엠파이어');
    });
  });

  it('모달에서 별점을 매기고, 그 정보는 저장되어 다시 볼 수 있어야 한다.', () => {
    cy.wait('@getPopularMoviesPage1').then(() => {
      cy.get('li').first().click();
    });
    cy.wait('@getMovieDetail').then(() => {
      cy.get('.item-votestar').first().click();
      cy.get('.close-button').click();
    });
    cy.get('li').first().click();
    cy.wait('@getMovieDetail').then(() => {
      cy.get('.modal-my-vote').should('contain', '2');
    });
  });
});
