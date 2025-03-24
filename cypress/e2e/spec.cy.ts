/// <reference types="cypress" />

describe("비동기 API 테스트 ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("영화 목록 API 를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    const popularMovieUrl =
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.request({
      method: "GET",
      url: popularMovieUrl,
      ...options,
    }).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
  });


  it("영화를 검색하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    const searchWord = "사랑";

    const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false?language=ko-KR&page=1`;
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.request({
      method: "GET",
      url: searchMovieUrl,
      ...options,
    }).as("searchedMovies");

    cy.get("@searchedMovies").its("status").should("eq", 200);
    cy.get("@searchedMovies").its("body.results").should("have.length", 20);
  });
});

describe("Fixture 테스트 ", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");
    cy.visit("http://localhost:5173/");
  });

  it("영화 목록 API 를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });
});
