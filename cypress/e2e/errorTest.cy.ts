import { createMoviePage, mockPopularMovies } from "../support/movieApi";

describe("에러 메시지 흐름", () => {
  it("초기 영화 목록 로딩에 실패하면 에러 메시지를 보여준다.", () => {
    cy.intercept("GET", "**/movie/popular**", {
      statusCode: 500,
      body: {},
    }).as("getPopularMovies");

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");

    cy.get(".error-text").should(
      "contain.text",
      "초기 화면을 불러오지 못했습니다.",
    );
  });

  it("검색 요청이 실패하면 검색 에러 메시지를 보여준다.", () => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
    });

    cy.intercept("GET", "**/search/movie**", {
      statusCode: 500,
      body: {},
    }).as("searchMovies");

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");

    cy.get(".search-bar").type("스파이더맨");
    cy.get(".search-btn").click();
    cy.wait("@searchMovies");

    cy.get(".error-text").should(
      "contain.text",
      "검색 결과를 불러오지 못했습니다.",
    );
  });

  it("더 보기 요청이 실패하면 추가 로딩 에러 메시지를 보여준다.", () => {
    cy.intercept("GET", "**/movie/popular**", (req) => {
      const page = Number(req.query.page ?? 1);

      if (page === 1) {
        req.reply({
          statusCode: 200,
          body: {
            results: createMoviePage("인기 영화", 1),
          },
        });
        return;
      }

      req.reply({
        statusCode: 500,
        body: {},
      });
    }).as("getPopularMovies");

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");

    cy.get(".display-more-btn").click();
    cy.wait("@getPopularMovies");

    cy.get(".error-text").should(
      "contain.text",
      "영화를 추가로 불러오지 못했습니다.",
    );
  });
});
