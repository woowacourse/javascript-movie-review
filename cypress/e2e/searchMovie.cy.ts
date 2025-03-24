///  <reference types="cypress" />

describe("영화 검색 비동기 API 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie*",
      },
      (req) => {
        req.continue((res) => {
          res.setDelay(1000);
          res.send({ fixture: "searchedMovieData.json" });
        });
      }
    ).as("searchMovies");

    cy.visit("http://localhost:5173");
  });

  it("검색 및 더보기 버튼 클릭 시 스켈레톤이 표시되고, 데이터를 받아오면 사라진다.", () => {
    cy.get("#search-bar").type("짱구");
    cy.get(".search-icon").click();
    cy.get(".skeleton-container").should("exist");

    cy.wait("@searchMovies");
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);
    cy.get(".skeleton-container").should("not.exist");

    cy.get(".see-more").click();
    cy.get(".skeleton-container").should("exist");

    cy.wait("@searchMovies");
    cy.get(".skeleton-container").should("not.exist");

    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 40);

    cy.get(".see-more").should("not.exist");
  });
});
