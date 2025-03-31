/// <reference types="cypress" />

describe("별점 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
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
  });

  it("영화에 별점을 선택하면 해당 별점이 반영되고 새로고침 후에도 별점이 유지된다.", () => {
    cy.get(".thumbnail-list .item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".movie-rate-stars .star").eq(3).click();

    cy.get(".movie-rate-comments").should("have.text", "재미있어요 (8/10)");

    cy.reload();

    cy.get(".thumbnail-list .item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".movie-rate-comments").should("have.text", "재미있어요 (8/10)");
  });
});
