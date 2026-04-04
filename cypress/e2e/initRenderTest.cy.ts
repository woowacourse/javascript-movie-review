import { createMoviePage, mockPopularMovies } from "../support/movieApi";

describe("초기 영화 렌더링 테스트", () => {
  beforeEach(() => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("초기 진입 시 영화 20개를 보여준다.", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li")
      .first()
      .find(".title")
      .should("have.text", "인기 영화 1");
  });
});
