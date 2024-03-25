describe("영화 목록 E2E 테스트", () => {
  const POPULAR_REQUEST_URL = "https://api.themoviedb.org/3/movie/popular?*";

  const SEARCH_REQUEST_URL = "https://api.themoviedb.org/3/search/movie?*";

  const MOVIE_LENGTH_PER_REQUEST = 20;

  const EMPTY_RESULT_LENGTH = 0;

  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: POPULAR_REQUEST_URL,
      },
      { fixture: "popular-movies.json", delay: 2000 }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: SEARCH_REQUEST_URL,
      },
      { fixture: "search-movies.json" }
    ).as("getSearchMovies");

    cy.visit("http://localhost:8080");
  });

  it("처음 영화 목록 페이지에 방문한 경우 스켈레톤 UI가 표시된다.", () => {
    cy.get("ul#skeleton-list").should("exist");
  });

  it("인기 영화 목록 API를 호출하면 20개의 영화 정보 목록이 나열된다.", () => {
    cy.wait("@getPopularMovies");

    cy.get("ul#movie-list-container").children().should("have.length", MOVIE_LENGTH_PER_REQUEST);
  });

  it("더보기 버튼을 클릭할 경우, 20개의 데이터가 추가된다.", () => {
    const EXPECTED_MOVIE_LENGTH = 40;

    cy.wait("@getPopularMovies");

    cy.get("button#next-button").click();

    cy.get("ul#movie-list-container").children().should("have.length", EXPECTED_MOVIE_LENGTH);
  });

  it("10 페이지의 데이터를 모두 보여준 후, 더보기 버튼은 사라져야한다", () => {
    const TOTAL_PAGE = 10;
    const CLICK_COUNT = 9;

    Array.from({ length: CLICK_COUNT }, () => {
      cy.wait("@getPopularMovies");
      cy.get("button#next-button").click();
    });

    cy.get("ul#movie-list-container")
      .children()
      .should("have.length", MOVIE_LENGTH_PER_REQUEST * TOTAL_PAGE);

    cy.get("button#next-button").should("not.exist");
  });

  context("영화 목록 검색 테스트", () => {
    it("특정 검색어를 입력하면, 검색된 영화 정보 목록이 나열된다.", () => {
      const SEARCH_KEYWORD = "해리";

      cy.wait("@getPopularMovies");

      cy.get("input#search-input").type(SEARCH_KEYWORD);
      cy.get("button#search-button").click();

      cy.get("ul#movie-list-container").children().should("have.length", MOVIE_LENGTH_PER_REQUEST);
      cy.get("ul#movie-list-container")
        .children()
        .each(($child) => {
          cy.wrap($child).should("contain", SEARCH_KEYWORD);
        });
    });

    it("검색 후 영화가 존재하지 않을 경우, 검색 결과 없음 UI가 보여진다", () => {
      cy.intercept(
        {
          method: "GET",
          url: SEARCH_REQUEST_URL,
        },
        { fixture: "empty-movies.json" }
      ).as("getEmptyMovies");

      const EMPTY_RESULT_TEXT = "검색 결과가 존재하지 않습니다.";
      const EMPTY_RESULT_SEARCH_KEYWORD = "harryharryharry";

      cy.wait("@getPopularMovies");

      cy.get("input#search-input").type(EMPTY_RESULT_SEARCH_KEYWORD);
      cy.get("button#search-button").click();

      cy.wait("@getEmptyMovies");

      cy.get("ul#movie-list-container").children().should("have.length", EMPTY_RESULT_LENGTH);

      cy.get("div#empty-result").should("contain", EMPTY_RESULT_TEXT);
    });
  });
});
