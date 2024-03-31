import { VOTE_MESSAGE } from '../../src/consts/message';

describe('fixture를 활용한 영화 디테일 모달 테스트', () => {
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
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+$/,
      },
      { fixture: 'movie-detail.json' },
    ).as('getDetailOfMovie');
    cy.visit('/');
  });

  it('영화를 클릭하면 디테일 모달이 열리고, 디테일 모달에는 해당 영화의 포스터, 제목, 별점, 설명이 있다.', () => {
    const MOVIE_TITLE = '쿵푸팬더 4';
    const MOVIE_OVERVIEW = '마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 ‘포’';
    cy.wait('@getPopularMovies').then(interception => {
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get('.item-list > li');
      popularMovieItems.eq(1).click();
      cy.get('#movie-info-modal').should('be.visible');

      cy.get('#movie-title').should('contain.text', MOVIE_TITLE);
      cy.get('#movie-info-poster').should('be.visible');
      cy.get('#movie-overview').should('contain.text', MOVIE_OVERVIEW);
      cy.get('#user-vote-box').should('be.visible');
    });
  });
});

//TODO: 점수 반응형시 점수 나오게.

//TODO: 점수 저장시 토스트 메세지 보이게.
//점수도 throttle 적용하기
