/// <reference types="cypress" />

describe("비동기 API 테스트", () => {
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.visit("localhost:5173");

    const MOVIE_URL = "https://api.themoviedb.org/3/movie/popular";
    const params = new URLSearchParams({
      language: "ko-KR",
      page: "1",
    });
    const popularMovieUrl = MOVIE_URL + "?" + params.toString();

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
});

describe("Fixture를 이용한 테스트 ", () => {
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");
    cy.visit("localhost:5173");

    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
      const popularMovieItems = cy.get(".item-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });
});
