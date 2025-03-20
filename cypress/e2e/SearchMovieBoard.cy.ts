/// <reference types="cypress" />

describe.skip("비동기 API 테스트", () => {
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.visit("localhost:5173");

    const MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
    const params = new URLSearchParams({
      query: "짱구",
      language: "ko-KR",
      page: "1",
    });
    const searchMovieUrl = MOVIE_URL + "?" + params.toString();

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

describe("검색 기능 E2E 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-searched.json" }
    ).as("getSearchedMovies");

    cy.visit("localhost:5173");
  });

  it("검색어 입력 후 검색 버튼을 클릭하면 API가 호출되고 결과가 표시되어야 한다.", () => {
    cy.get("form.search-bar input").should("exist").type("짱구");
    cy.get('form.search-bar button[type="submit"]').should("exist").click();

    cy.wait("@getSearchedMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const searchedMovies = interception.response.body.results;
      expect(searchedMovies.length).to.equal(20);

      cy.get(".thumbnail-list > li").should("have.length", 20);
    });
  });

  it("검색어 입력 후 Enter 키를 누르면 API가 호출되고 결과가 표시되어야 한다.", () => {
    cy.get("form.search-bar input").should("exist").type("짱구{enter}");

    cy.wait("@getSearchedMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const searchedMovies = interception.response.body.results;
      expect(searchedMovies.length).to.equal(20);

      cy.get(".thumbnail-list > li").should("have.length", 20);
    });
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.get("form.search-bar input").type("짱구{enter}");

    cy.wait("@getSearchedMovies");
    cy.get(".thumbnail-list > li").should("have.length", 20);
  });

  it("더보기 버튼을 누르면 최대 20개가 목록에 추가되어야 한다.", () => {
    cy.get("form.search-bar input").type("짱구{enter}");

    cy.wait("@getSearchedMovies");
    cy.get(".more-movies-button").should("exist").click();
    cy.get(".thumbnail-list > li").should("have.length", 40);
  });

  it("마지막 페이지이면 더보기 버튼이 사라져야 한다.", () => {
    cy.get("form.search-bar input").type("짱구{enter}");

    cy.wait("@getSearchedMovies");
    cy.get(".more-movies-button").should("exist").click();
    cy.get(".more-movies-button").should("not.exist");
  });
});
