import { createMoviePage, mockPopularMovies } from "../support/movieApi";

describe("에러 메시지 흐름", () => {
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

    cy.scrollTo("bottom");
    cy.wait("@getPopularMovies");

    cy.get(".error-text").should(
      "contain.text",
      "영화를 추가로 불러오지 못했습니다.",
    );
  });
});
