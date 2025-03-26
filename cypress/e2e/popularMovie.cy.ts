///  <reference types="cypress" />

describe("인기 있는 영화 비동기 API 테스트", () => {
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

  it("초기 페이지 로딩 시 인기 있는 영화 목록 API를 호출하면서 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
  });

  it("인기 있는 영화에서 더보기 버튼을 누르면 영화 목록 API를 호출하며 20개가 목록에 추가된다.", () => {
    cy.get(".see-more").click();
    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 40);
  });
});
