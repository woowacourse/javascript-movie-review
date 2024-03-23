import {
  POPULAR_REQUEST_URL,
  SEARCH_REQUEST_URL,
  DEVELOPMENT_SERVER_URL,
  EXPECTED_MOVIE_LENGTH,
  MOVIE_LENGTH_PER_RESQUEST,
  TOTAL_PAGE,
} from "../constant";

describe("영화 검색 E2E 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: POPULAR_REQUEST_URL,
      },
      { fixture: "popular-movies.json" }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: SEARCH_REQUEST_URL,
      },
      { fixture: "search-movies.json" }
    ).as("getSearchMovies");

    cy.visit(DEVELOPMENT_SERVER_URL);
  });

  it("검색창에 특정 기워드 검색 시, 검색 키워드에 맞는 데이터가 8개 보여진다.", () => {
    cy.get("input#search-input").type("해리");
    cy.get("button#search-button").click();

    cy.wait("@getPopularMovies").then((interception) => {
      if (interception.response) {
        const initialMovies = interception.response.body.results;
        expect(initialMovies.length).to.equal(EXPECTED_MOVIE_LENGTH);
      }
    });

    cy.get("ul#movie-list-container").children().should("have.length", EXPECTED_MOVIE_LENGTH);
    cy.get("ul#movie-list-container").children().first().should("contain", "해리");
  });
});
