describe("영화 검색 E2E 테스트", () => {
  beforeEach(() => {
    const POPULAR_REQUEST_URL = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=*";

    cy.intercept(
      {
        method: "GET",
        url: POPULAR_REQUEST_URL,
      },
      { fixture: "popular-movies.json" }
    ).as("getPopularMovies");

    const SEARCH_REQUEST_URL = "https://api.themoviedb.org/3/search/movie?query=%ED%95%B4%EB%A6%AC&include_adult=false&language=ko-KR&page=*";

    cy.intercept(
      {
        method: "GET",
        url: SEARCH_REQUEST_URL,
      },
      { fixture: "search-movies.json" }
    ).as("getSearchMovies");

    cy.visit("http://localhost:8080");
  });

  it("검색창에 특정 기워드 검색 시, 검색 키워드에 맞는 데이터가 8개 보여진다.", () => {
    const EXPECTED_MOVIE_LENGTH = 20;

    cy.get("input#search-input").type("해리");
    cy.get("button#search-button").click();

    cy.wait("@getP").then((interception) => {
      if (interception.response) {
        const initialMovies = interception.response.body.results;
        expect(initialMovies.length).to.equal(EXPECTED_MOVIE_LENGTH);
      }
    });

    cy.get("ul#movie-list-container").children().should("have.length", EXPECTED_MOVIE_LENGTH);
    cy.get("ul#movie-list-container").children().first().should("contain", "해리");
  });
});
