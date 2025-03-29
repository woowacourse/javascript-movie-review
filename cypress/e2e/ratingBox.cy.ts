/// <reference types="cypress" />

describe("별점 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      { fixture: "popularMovieData.json" }
    ).as("fetchMovies");

    cy.visit("http://localhost:5173");
    cy.wait("@fetchMovies");
  });

  it("영화에 별점을 선택하면 해당 별점이 반영되고 새로고침 후에도 별점이 유지된다.", () => {
    cy.get(".thumbnail-list .item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".my-star-box .star").eq(3).click();

    cy.get(".score-text").should("have.text", "재미있어요");
    cy.get(".score").should("have.text", "(8/10)");

    cy.reload();

    cy.get(".thumbnail-list .item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".score-text").should("have.text", "재미있어요");
    cy.get(".score").should("have.text", "(8/10)");
  });
});
