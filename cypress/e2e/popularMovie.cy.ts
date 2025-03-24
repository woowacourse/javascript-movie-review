///  <reference types="cypress" />

describe("인기 있는 영화 비동기 API 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?*",
      (req) => {
        req.continue((res) => {
          if (req.url.includes("page=1")) {
            res.body.results = Array(20).fill({ title: "Page 1" });
          } else if (req.url.includes("page=2")) {
            res.body.results = Array(20).fill({ title: "Page 2" });
          }
        });
      }
    ).as("fetchMovies");

    cy.visit("localhost:5173");
    cy.wait("@fetchMovies");
  });

  it("초기 페이지 로딩 시 인기 있는 영화 목록 API를 호출하면서 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.get("@fetchMovies").its("response.statusCode").should("eq", 200);
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);
  });

  it("인기 있는 영화에서 더보기 버튼을 누르면 영화 목록 API를 호출하며 20개가 목록에 추가된다.", () => {
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);
    cy.get(".see-more").click();
    cy.wait("@fetchMovies").its("request.url").should("include", "page=2");
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 40);
  });
});
