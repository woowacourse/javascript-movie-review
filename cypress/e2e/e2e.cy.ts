import { POPULAR_MOVIES_URL } from '../../src/constants/url';

/* eslint-disable max-lines-per-function */
describe('영화 리뷰 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('랜딩 페이지 테스트', () => {
    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
      const params = '?language=ko-KR&page=1';
      const popularMovieUrl = POPULAR_MOVIES_URL + params;

      cy.request({
        url: popularMovieUrl,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
          accept: 'application/json',
        },
      }).as('popularMovies');

      cy.get('@popularMovies').its('status').should('eq', 200);
      cy.get('@popularMovies').its('body.results').should('have.length', 20);
    });

    it('랜딩 페이지 접속 시 API 응답받아 영화 목록 20개를 보여준다.', () => {
      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });

    it('무한스크롤을 구현하여 스크롤을 페이지 하단으로 내릴 시 영화 목록 20개씩 추가로 보여준다.', () => {
      cy.scrollTo('bottom', { duration: 1000 });

      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 40));

      cy.scrollTo('bottom', { duration: 1000 });
      expect(popularMovieItems.should('have.length', 60));
    });
  });
});
