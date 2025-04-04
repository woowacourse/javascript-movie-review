/// <reference types="cypress" />

describe("인기 있는 영화 비동기 API 테스트 (무한 스크롤)", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      (req) => {
        req.continue((res) => {
          res.setDelay(1000);
          res.send({ fixture: "popularMovieData.json" });
        });
      }
    ).as("fetchMovies");

    cy.visit("http://localhost:5173");
    cy.get(".skeleton-container").should("exist");

    cy.wait("@fetchMovies");
    cy.get(".skeleton-container").should("not.exist");
  });

  it("초기 페이지 로딩 시 인기 있는 영화 목록 API를 호출하면서 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.get("@fetchMovies").its("response.statusCode").should("eq", 200);
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);
  });

  it("페이지 하단으로 스크롤하면 새로운 영화 목록이 추가로 로드된다.", () => {
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);

    cy.scrollTo("bottom");

    cy.get(".skeleton-container").should("exist");

    cy.wait("@fetchMovies").its("request.url").should("include", "page=2");

    cy.get(".skeleton-container").should("not.exist");
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 40);
  });
});
