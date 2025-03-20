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
        Authorization: `Bearer ${Cypress.env("TMDB_API_KEY")}`,
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

describe("", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.viewport(1280, 720);
  });

  it("정상적으로 페이지에 접속한 경우 영화 20개가 보인다.", () => {
    // cy.get(".").contains("").should("be.visible");
    cy.get(".thumbnail-list").find(".item").should("have.length", 20);
  });
});
