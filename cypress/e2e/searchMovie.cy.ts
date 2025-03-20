///  <reference types="cypress" />

describe("영화 검색 비동기 API 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("미키 17 검색하면 1개만 나오고 더보기 버튼 안보여야 한다", () => {
    cy.get("#search-bar").type("미키 17");

    const query = encodeURIComponent("미키 17");

    const searchedMovieUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.intercept({
      method: "GET",
      url: searchedMovieUrl,
      ...options,
    }).as("searchMovies");

    cy.get(".search-icon").click();
    cy.wait("@searchMovies")
      .its("response")
      .should((response) => {
        expect(response?.statusCode).to.eq(200);
        expect(response?.body.results).to.have.length(1);
      });
    cy.get(".see-more").should("not.exist");
  });
});
