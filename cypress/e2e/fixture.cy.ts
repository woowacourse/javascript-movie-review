/// <reference types="cypress" />

describe("Fixture를 이용한 테스트", () => {
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
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?page=1(?:&.*)?/,
      },
      { fixture: "movie-search-first.json" }
    ).as("getFirstSearchedMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?page=2(?:&.*)?/,
      },
      { fixture: "movie-search-second.json" }
    ).as("getSecondSearchedMovies");

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });

  it("영화 검색 API를 호출하면 검색 결과가 보인다.", () => {
    cy.get("#search").click();

    cy.wait("@getFirstSearchedMovies").then((interception) => {
      const searchedMovies = interception.response?.body.results;
      expect(searchedMovies.length).to.equal(20);
    });

    expect(cy.get(".thumbnail-list > li").should("have.length", 20));

    cy.get("#seeMore").click();

    cy.wait("@getSecondSearchedMovies").then((interception) => {
      expect(interception.response?.body.results.length).to.equal(15);
    });

    expect(cy.get(".thumbnail-list > li").should("have.length", 35));
  });
});
