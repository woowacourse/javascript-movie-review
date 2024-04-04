describe("영화 목록 E2E 테스트", () => {
  const MOVIE_LENGTH_PER_REQUEST = 20;

  const EMPTY_RESULT_LENGTH = 0;

  beforeEach(() => {
    cy.getPopularMoviesWithDelay();

    cy.visit("/");
  });

  it.skip("처음 영화 목록 페이지에 방문한 경우 스켈레톤 UI가 표시된다.", () => {
    cy.get("ul#movie-list-container #item-skeleton").should("exist");
  });

  it.skip("인기 영화 목록 API를 호출하면 20개의 영화 정보 목록이 나열된다.", () => {
    cy.wait("@getPopularMovies");

    cy.get("ul#movie-list-container").children().should("have.length", MOVIE_LENGTH_PER_REQUEST);
  });

  it.skip("페이지를 제일 아래로 스크롤 하면, 20개의 추가된 영화 정보 목록이 나열된다..", () => {
    cy.reload();

    const EXPECTED_MOVIE_LENGTH = 40;

    cy.wait("@getPopularMovies");

    cy.scrollTo("bottom");

    cy.wait("@getPopularMovies");

    cy.get("ul#movie-list-container").children().should("have.length", EXPECTED_MOVIE_LENGTH);
  });

  it("10개 페이지의 데이터를 모두 보여준 후, 데이터 페칭을 유도하는 div 요소는 사라져야한다", () => {
    const TOTAL_PAGE = 10;
    const CLICK_COUNT = 9;

    Array.from({ length: CLICK_COUNT }, () => {
      cy.wait("@getPopularMovies");
      cy.scrollTo("bottom");
    });

    cy.get("ul#movie-list-container")
      .children()
      .should("have.length", MOVIE_LENGTH_PER_REQUEST * TOTAL_PAGE);

    cy.get("div#scroll-trigger").should("not.exist");
  });

  context.skip("영화 목록 조회 네트워크 예외 테스트", () => {
    const NETWORK_EXCEPTION_DATA = [
      {
        code: 401,
        errorMessage: "해당 컨텐츠에 대한 접근 권한이 없습니다.",
      },
      {
        code: 403,
        errorMessage: "해당 컨텐츠에 대한 접근 권한이 없습니다.",
      },
      {
        code: 404,
        errorMessage: "요청한 컨텐츠를 찾을 수 없습니다. 올바른 주소로 다시 요청해주세요.",
      },
      {
        code: 500,
        errorMessage: "서버에서 알 수 없는 문제가 발생해 페이지를 표시할 수 없습니다.",
      },

      {
        code: 503,
        errorMessage: "서버가 컨텐츠를 보여줄 준비가 되지 않았습니다.",
      },
    ];

    it("영화 목록 데이터 페칭 중, 네트워크 예외가 발생하면 예외 상황을 메시지로 사용자에게 알려준다", () => {
      NETWORK_EXCEPTION_DATA.forEach(({ code, errorMessage }) => {
        cy.getPopularMoviesWithError(code);

        cy.reload();

        cy.wait("@getPopularMoviesWithError");

        cy.get("div#error-message-container").should("contain", errorMessage);
      });
    });

    it("영화 목록 데이터 페칭 중, 네트워크 연결이 끊어지면 해당 상황을 메시지로 사용자에게 알려준다", () => {
      const EXPECTED_ERROR_MESSAGE = "네트워크 오류: 데이터를 요청할 수 없습니다. 인터넷 연결을 확인하고 다시 시도해주세요.";

      cy.getPopularMoviesWithNetworkOff();

      cy.reload();

      cy.wait("@getPopularMoviesWithNetworkOff");

      cy.get("div#error-message-container").should("contain", EXPECTED_ERROR_MESSAGE);
    });
  });

  context("영화 목록 검색 테스트", () => {
    it("특정 검색어를 입력하면, 검색된 영화 정보 목록이 나열된다.", () => {
      const SEARCH_KEYWORD = "해리";

      cy.getSearchMoviesWithDelay("getSearchMovies", "search-movies.json");

      cy.wait("@getPopularMovies");

      cy.search(SEARCH_KEYWORD);

      cy.wait("@getSearchMovies");

      cy.get("ul#movie-list-container").children().should("have.length", MOVIE_LENGTH_PER_REQUEST);
      cy.get("ul#movie-list-container")
        .children()
        .each(($child) => {
          cy.wrap($child).should("contain", SEARCH_KEYWORD);
        });
    });

    it("검색 키워드와 관련된 영화가 존재하지 않을 경우, 검색 결과 없음 UI가 보여진다.", () => {
      const EMPTY_RESULT_TEXT = "검색 결과가 존재하지 않습니다 🥲";
      const EMPTY_RESULT_SEARCH_KEYWORD = "harryharryharry";

      cy.getSearchMoviesWithDelay("getEmptyMovies", "empty-movies.json");

      cy.wait("@getPopularMovies");

      cy.search(EMPTY_RESULT_SEARCH_KEYWORD);

      cy.wait("@getEmptyMovies");

      cy.get("ul#movie-list-container").children().should("have.length", EMPTY_RESULT_LENGTH);
      cy.get("ul#empty-result").should("contain", EMPTY_RESULT_TEXT);
    });
  });
});
