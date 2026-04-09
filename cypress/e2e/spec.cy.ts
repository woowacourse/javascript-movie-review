const createMockMovie = (id: number) => ({
  id,
  title: `어벤져스 ${id}`,
  poster_path: `/avengers${id}.jpg`,
  vote_average: 7.5,
  backdrop_path: `/backdrop${id}.jpg`,
  genre_ids: [28],
  original_language: "ko",
  original_title: `어벤져스 ${id}`,
  overview: "타노스를 조심해",
  popularity: 22.4343,
  release_date: "2026-04-01",
  video: false,
  vote_count: 1000,
  adult: false,
});

const createMoviesResponse = (count: number, page: number = 1) => ({
  page,
  results: Array.from({ length: count }, (_, i) =>
    createMockMovie((page - 1) * 20 + i + 1),
  ),
  total_pages: 500,
  total_results: 10000,
});

describe("영화 리뷰 앱", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular*", createMoviesResponse(20)).as(
      "getPopularMovies",
    );
    cy.visit("/");
  });

  describe("홈 화면", () => {
    it("첫 렌더링시 영화 배너가 렌더링된다", () => {
      cy.wait("@getPopularMovies");
      cy.get(".banner-container .top-rated-movie").should("be.visible");
      cy.get(".banner-container .title").should("have.text", "어벤져스 1");
    });

    it("첫 렌더링시 섹션 헤더가 렌더링된다", () => {
      cy.wait("@getPopularMovies");
      cy.get("section > h2").should("be.visible");
      cy.get("section > h2").should("have.text", "지금 인기 있는 영화");
    });

    it("초기 영화 데이터가 20개가 렌더링된다", () => {
      cy.wait("@getPopularMovies");
      cy.get(".thumbnail-list li").should("have.length", 20);
    });

    it("영화 데이터 로딩 중 스켈레톤 UI가 표시된다", () => {
      cy.intercept("GET", "**/movie/popular*", (req) => {
        req.reply({ delay: 500, body: createMoviesResponse(20) });
      }).as("getPopularMoviesDelayed");

      cy.visit("/");
      cy.get(".thumbnail-list li.skeleton").should("exist");
      cy.wait("@getPopularMoviesDelayed");
      cy.get(".thumbnail-list li.skeleton").should("not.exist");
    });
  });

  describe("더 보기", () => {
    it("더 보기 클릭 시 영화가 20개 추가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/movie/popular*", createMoviesResponse(20, 2)).as(
        "getMoreMovies",
      );

      cy.get(".load-more-button").click();
      cy.wait("@getMoreMovies");

      cy.get(".thumbnail-list li").should("have.length", 40);
    });

    it("마지막 페이지일 때 더 보기 버튼이 숨겨진다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/movie/popular*", createMoviesResponse(5, 2)).as(
        "getLastPageMovies",
      );

      cy.get(".load-more-button").click();
      cy.wait("@getLastPageMovies");

      cy.get(".load-more-button").should("not.be.visible");
    });

    it("더 보기 API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/movie/popular*", { statusCode: 500 }).as(
        "getMoreMoviesError",
      );

      cy.get(".load-more-button").click();
      cy.wait("@getMoreMoviesError");

      cy.get(".notice-text").should(
        "contain.text",
        "오류가 발생했습니다. 다시 시도해주세요.",
      );
    });
  });

  describe("검색", () => {
    it("검색 시 결과가 렌더링되고 섹션 헤딩에 검색어가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.get(".thumbnail-list li").should("have.length", 5);
      cy.get("section > h2").should("contain.text", "액션");
    });

    it("검색 결과가 마지막 페이지일 때 더 보기 버튼이 숨겨진다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchLastPage",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchLastPage");

      cy.get(".load-more-button").should("not.be.visible");
    });

    it("검색 더 보기에서 마지막 페이지일때 더 보기 버튼이 숨겨진다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(20)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(3, 2)).as(
        "searchLastPage",
      );

      cy.get(".load-more-button").click();
      cy.wait("@searchLastPage");

      cy.get(".load-more-button").should("not.be.visible");
    });

    it("검색 결과가 없을 때 안내 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      }).as("searchEmpty");

      cy.get(".search-form input").type("겨울왕국");
      cy.get(".search-form").submit();
      cy.wait("@searchEmpty");

      cy.get(".notice-text").should("contain.text", "검색 결과가 없습니다");
    });

    it("검색 이후 더 보기 API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(20)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", { statusCode: 500 }).as(
        "searchMoreMoviesError",
      );

      cy.get(".load-more-button").click();
      cy.wait("@searchMoreMoviesError");

      cy.get(".notice-text").should(
        "contain.text",
        "오류가 발생했습니다. 다시 시도해주세요.",
      );
    });
  });

  describe("에러 처리", () => {
    it("API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.intercept("GET", "**/movie/popular*", {
        statusCode: 500,
      }).as("getPopularMoviesError");

      cy.visit("/");
      cy.wait("@getPopularMoviesError");

      cy.get(".notice-text").should(
        "contain.text",
        "오류가 발생했습니다. 다시 시도해주세요.",
      );
    });

    it("API 실패 이후 검색 시 검색 결과가 렌더링된다", () => {
      cy.intercept("GET", "**/movie/popular*", {
        statusCode: 500,
      }).as("getPopularMoviesError");

      cy.visit("/");
      cy.wait("@getPopularMoviesError");
      cy.get(".notice-text").should("exist");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.get(".thumbnail-list li").should("have.length", 5);
      cy.get("section > h2").should("contain.text", "액션");
    });

    [
      ["인증에 실패했습니다. API 키를 확인해주세요.", 401],
      ["요청한 정보를 찾을 수 없습니다", 404],
      ["오류가 발생했습니다. 다시 시도해주세요.", 500],
    ].forEach(([message, statusCode]) => {
      it(`API ${statusCode} 에러 시 에러 메시지가 렌더링된다`, () => {
        cy.wait("@getPopularMovies");

        cy.intercept("GET", "**/movie/popular*", { statusCode }).as(
          "getMoreMoviesError",
        );

        cy.get(".load-more-button").click();
        cy.wait("@getMoreMoviesError");

        cy.get(".notice-text").should("contain.text", message);
      });
    });
  });
});
