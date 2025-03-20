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

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-search.json" }
    ).as("getSearchMovies");
    
    cy.get("#searchInput").type("짱구").should("have.value", "짱구");
    cy.get(".search-input-box")
      .find("button")
      .click();

    // 검색 API 응답 대기
    cy.wait("@getSearchMovies").then((interception) => {
       cy.get(".thumbnail-list > li").should("have.length", 20);
       
    });

    cy.get(".thumbnail-list li")
    .first()
    .find("strong")
    .should("have.text", "짱구");
  });
});
