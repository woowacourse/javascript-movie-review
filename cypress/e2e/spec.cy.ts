/// <reference types="cypress" />

describe("비동기 API 테스트 ", () => {
  it("영화 목록 API 를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.visit("http://localhost:5173/");

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
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      const popularMovies = interception.response?.body.results;
      console.log(popularMovies);
      expect(popularMovies.length).to.equal(20);

      // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });
});
