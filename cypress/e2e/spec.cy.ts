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

const createMockMovieDetail = (id: number) => ({
  id,
  title: `어벤져스 ${id}`,
  poster_path: `/avengers${id}.jpg`,
  vote_average: 7.5,
  backdrop_path: `/backdrop${id}.jpg`,
  genres: [{ id: 28, name: "액션" }],
  original_language: "ko",
  original_title: `어벤져스 ${id}`,
  overview: "타노스를 조심해",
  popularity: 22.4343,
  release_date: "2026-04-01",
  tagline: "어벤져스 어셈블",
  video: false,
  vote_count: 1000,
  adult: false,
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

    it("재검색 시 새로운 결과가 렌더링되고 섹션 헤딩에 새 검색어가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(3)).as(
        "reSearchMovies",
      );

      cy.get(".search-form input").clear().type("공포");
      cy.get(".search-form").submit();
      cy.wait("@reSearchMovies");

      cy.get(".thumbnail-list li").should("have.length", 3);
      cy.get("section > h2").should("contain.text", "공포");
    });

    it("재검색 결과가 없을 때 안내 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      }).as("reSearchEmpty");

      cy.get(".search-form input").clear().type("겨울왕국");
      cy.get(".search-form").submit();
      cy.wait("@reSearchEmpty");

      cy.get(".notice-text").should("contain.text", "검색 결과가 없습니다");
    });

    it("검색 API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", { statusCode: 500 }).as(
        "searchMoviesError",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMoviesError");

      cy.get(".notice-text").should(
        "contain.text",
        "영화 정보를 불러오는 데 실패했습니다.",
      );
    });

    it("검색 이후 더 보기 클릭 시 영화가 20개 추가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(20)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(20, 2)).as(
        "searchMoreMovies",
      );

      cy.get(".load-more-button").click();
      cy.wait("@searchMoreMovies");

      cy.get(".thumbnail-list li").should("have.length", 40);
    });

    it("검색 중 스켈레톤 UI가 표시된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", (req) => {
        req.reply({ delay: 500, body: createMoviesResponse(5) });
      }).as("searchMoviesDelayed");

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.get(".thumbnail-list li.skeleton").should("exist");

      cy.wait("@searchMoviesDelayed");
      cy.get(".thumbnail-list li.skeleton").should("not.exist");
    });

    it("검색 후 로고 클릭 시 인기 영화 목록으로 돌아간다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/movie/popular*", createMoviesResponse(20)).as(
        "getPopularMoviesAgain",
      );

      cy.get(".logo a").click();
      cy.wait("@getPopularMoviesAgain");

      cy.get(".thumbnail-list li").should("have.length", 20);
      cy.get("section > h2").should("have.text", "지금 인기 있는 영화");
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
        "영화 정보를 불러오는 데 실패했습니다.",
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
        "영화 정보를 불러오는 데 실패했습니다.",
      );
    });
  });

  describe("영화 상세 정보 모달", () => {
    it("영화 포스터 또는 제목 클릭 시 영화 상세 정보 모달이 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", /\/movie\/\d+/, createMockMovieDetail(1)).as(
        "getMovieDetails",
      );

      cy.get(".thumbnail-list li:first-child").click();
      cy.wait("@getMovieDetails");

      cy.get(".modal-background").should("be.visible");
      cy.get(".modal h2").should("have.text", "어벤져스 1");
    });

    it("영화 상세 정보 조회 API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", /\/movie\/\d+/, { statusCode: 500 }).as(
        "getMovieDetailsError",
      );

      cy.get(".thumbnail-list li:first-child").click();
      cy.wait("@getMovieDetailsError");

      cy.get(".notice-text").should(
        "contain.text",
        "영화 정보를 불러오는 데 실패했습니다.",
      );
    });
  });

  describe("영화 상세 정보 모달 닫기", () => {
    beforeEach(() => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", /\/movie\/\d+/, createMockMovieDetail(1)).as(
        "getMovieDetails",
      );

      cy.get(".thumbnail-list li:first-child").click();
      cy.wait("@getMovieDetails");
      cy.get(".modal-background").should("be.visible");
    });

    it("ESC 키 입력 시 모달이 닫힌다", () => {
      cy.get("body").type("{esc}");
      cy.get(".modal-background").should("not.exist");
    });

    it("모달 외부(dimmed) 클릭 시 모달이 닫힌다", () => {
      cy.get(".modal-background").click({ force: true });
      cy.get(".modal-background").should("not.exist");
    });

    it("X 버튼 클릭 시 모달이 닫힌다", () => {
      cy.get(".close-modal").click();
      cy.get(".modal-background").should("not.exist");
    });
  });

  describe("별점", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.wait("@getPopularMovies");

      cy.intercept("GET", /\/movie\/\d+/, createMockMovieDetail(1)).as(
        "getMovieDetails",
      );

      cy.get(".thumbnail-list li:first-child").click();
      cy.wait("@getMovieDetails");
    });

    it("모달 오픈 시 별점이 초기값(0/10)으로 표시된다", () => {
      cy.get(".my-rating__point").should("have.text", "(0/10)");
    });

    it("별점 클릭 시 해당 별점으로 변경된다", () => {
      cy.get('.my-rating__content img[data-rating-value="8"]').click();

      cy.get(".my-rating__point").should("have.text", "(8/10)");
      cy.get(".my-rating__content img")
        .eq(0)
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get(".my-rating__content img")
        .eq(3)
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get(".my-rating__content img")
        .eq(4)
        .should("have.attr", "src")
        .and("include", "star_empty");
    });

    it("새로고침 후에도 매긴 별점이 유지된다", () => {
      cy.get('.my-rating__content img[data-rating-value="6"]').click();
      cy.get(".my-rating__point").should("have.text", "(6/10)");

      cy.get(".close-modal").click();
      cy.get(".modal-background").should("not.exist");

      cy.reload();
      cy.wait("@getPopularMovies");

      cy.intercept("GET", /\/movie\/\d+/, createMockMovieDetail(1)).as(
        "getMovieDetailsAgain",
      );

      cy.get(".thumbnail-list li:first-child").click();
      cy.wait("@getMovieDetailsAgain");

      cy.get(".my-rating__point").should("have.text", "(6/10)");
    });
  });
});
