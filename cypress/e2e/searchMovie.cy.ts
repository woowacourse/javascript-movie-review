/// <reference types="cypress" />

describe("스켈레톤 UI 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it('"더 보기" 버튼이 최대 페이지 도달 시 사라지는지 확인', () => {
    const searchWord = "짱구";
    let currentPage = 1;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.get(".search-input").type(searchWord);
    cy.get(".search-button").click();

    cy.intercept("GET", "**/search/movie?query=짱구**").as("searchMovies");

    const MAXIMUM_PAGE = 2;
    for (let i = 1; i < MAXIMUM_PAGE; i++) {
      cy.wait(500);
      cy.get("button.more").should("be.visible").click();

      currentPage++;
    }
    cy.get("button.more", { timeout: 5000 }).should("not.exist");
  });
});
