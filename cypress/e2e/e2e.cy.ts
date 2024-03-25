import { POPULAR_MOVIES_URL, SEARCH_MOVIES_URL } from "../../src/constants/url";

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
            accept: 'application/json'
          }
        }).as("popularMovies");

        cy.get("@popularMovies").its("status").should("eq", 200);
        cy.get("@popularMovies").its("body.results").should("have.length", 20);
      });

      it('랜딩 페이지 접속 시 API 응답받아 영화 목록 20개를 보여준다.', () => {
        const popularMovieItems = cy.get(".item-list > li");
        expect(popularMovieItems.should("have.length", 20));
      });
  
      it('더보기 클릭 시 영화 목록 20개를 추가로 보여준다.', () => {
        cy.get('#more-button').click();
        const popularMovieItems = cy.get(".item-list > li");
        expect(popularMovieItems.should("have.length", 40));
      });
    });
  
    describe('검색 기능 테스트', () => {
      it('harry를 파라미터로 넣고 영화 검색 API를 호출하면 영화 목록 20개를 API 응답값으로 받는다.', () => {
        const params = '?query=harry&include_adult=false&language=en-US&page=1';
        const searchMoviesUrl = SEARCH_MOVIES_URL + params;

        cy.request({
          url: searchMoviesUrl,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
            accept: 'application/json'
          }
        }).as("searchMovies");

        cy.get("@searchMovies").its("status").should("eq", 200);
        cy.get("@searchMovies").its("body.results").should("have.length", 20);
      });

      it('harry를 입력하고 엔터 클릭 시 영화 목록 20개를 보여준다.', () => {
        cy.get('#search-input').type('harry{enter}');
        const searchMovieItems = cy.get(".item-list > li");
        expect(searchMovieItems.should("have.length", 20));
      });
  
      it('harry를 입력하고 버튼 클릭 시 영화 목록 20개를 보여준다.', () => {
        cy.get('#search-input').type('harry');
        cy.get('#search-button').click();
        const searchMovieItems = cy.get(".item-list > li");
        expect(searchMovieItems.should("have.length", 20));
      });
    });
  });
  