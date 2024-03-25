/* eslint-disable max-lines-per-function */
describe('fixture를 활용한 영화 리뷰 e2e 테스트', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        { fixture: "movie-popular.json" }
      ).as("getPopularMovies");
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
        },
        { fixture: "movie-search.json" }
      ).as("getSearchMovies");
      cy.visit('/');
    });
  
    describe('랜딩 페이지 테스트', () => {
      it('랜딩 페이지 접속 시 API 응답받아 영화 목록 20개를 보여준다.', () => {
        cy.wait("@getPopularMovies").then((interception) => {
          if (interception.response === undefined) return;
    
          const popularMovies = interception.response.body.results;
          expect(popularMovies.length).to.equal(20);
    
          const popularMovieItems = cy.get(".item-list > li");
          expect(popularMovieItems.should("have.length", 20));
        });
      });
  
      it('더보기 클릭 시 영화 목록 20개를 추가로 보여준다.', () => {
        cy.get('#more-button').click();
        cy.wait("@getPopularMovies").then((interception) => {
          if (interception.response === undefined) return;
    
          const popularMovies = interception.response.body.results;
          expect(popularMovies.length).to.equal(20);
    
          const popularMovieItems = cy.get(".item-list > li");
          expect(popularMovieItems.should("have.length", 40));
        });
      });
    });
  
    describe('검색 기능 테스트', () => {
      it('마루를 입력하고 엔터 클릭 시 영화 목록 20개를 보여준다.', () => {
        cy.get('#search-input').type('마루{enter}');
        cy.wait("@getSearchMovies").then((interception) => {
          if (interception.response === undefined) return;
    
          const searchMovies = interception.response.body.results;
          expect(searchMovies.length).to.equal(20);
    
          const searchMovieItems = cy.get(".item-list > li");
          expect(searchMovieItems.should("have.length", 20));
        });
      });
  
      it('마루를 입력하고 버튼 클릭 시 영화 목록 20개를 보여준다.', () => {
        cy.get('#search-input').type('마루');
        cy.get('#search-button').click();
        cy.wait("@getSearchMovies").then((interception) => {
          if (interception.response === undefined) return;
    
          const searchMovies = interception.response.body.results;
          expect(searchMovies.length).to.equal(20);
    
          const searchMovieItems = cy.get(".item-list > li");
          expect(searchMovieItems.should("have.length", 20));
        });
      });
    });
  });
  