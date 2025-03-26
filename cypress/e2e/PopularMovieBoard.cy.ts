/// <reference types="cypress" />

describe.skip("비동기 API 테스트", () => {
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

describe("인기 있는 영화 페이지 E2E 테스트 ", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });

  it("더보기 버튼을 누르면 최대 20개가 목록에 추가되어야 한다.", () => {
    cy.get(".more-movies-button").should("exist").click();

    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 40));
  });

  it("마지막 페이지이면 더보기 버튼이 사라져야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      if (!interception.response) {
        throw new Error("No response received from interception");
      }

      const totalPages = interception.response.body.total_pages;

      for (let i = 0; i < totalPages; i++) {
        cy.get(".more-movies-button").should("exist").click();
      }

      cy.get(".more-movies-button").should("not.exist");
    });
  });

  it("가장 인기있는 영화가 상단에 떠야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      const topRatedMovie = popularMovies[0];

      cy.get(".top-rated-movie .title")
        .should("exist")
        .should("have.text", topRatedMovie.title);
    });
  });
});
