const TMDB_POPULAR_URL_PATTERN = "**/movie/popular**";
const TMDB_SEARCH_URL_PATTERN = "**/search/movie**";
const TMDB_MOVIE_DETAIL_URL_PATTERN = /\/movie\/\d+/;

describe("Movie App", () => {
  beforeEach(() => {
    cy.intercept("GET", TMDB_POPULAR_URL_PATTERN, (req) => {
      const url = new URL(req.url);
      const page = url.searchParams.get("page");
      req.reply({ fixture: page === "1" ? "popular-movies-p1.json" : "popular-movies-p2.json" });
    }).as("popularMovies");

    cy.intercept("GET", TMDB_SEARCH_URL_PATTERN, (req) => {
      const url = new URL(req.url);
      const query = url.searchParams.get("query");
      req.reply({ fixture: query === "$$%@@" ? "empty-search.json" : "search-results.json" });
    }).as("searchMovies");

    cy.visit("localhost:5173");
    cy.wait("@popularMovies");
  });

  context("Movie List 탐색 - 무한 스크롤", () => {
    it("초기 목록 20개 표시 후 페이지 끝 스크롤 시 40개 표시", () => {
      cy.get(".item").should("have.length", 20);
      cy.get(".scroll-area").scrollIntoView();
      cy.wait("@popularMovies");
      cy.get(".item").should("have.length", 40);
    });

    it("페이지 끝 스크롤 시 로딩 중 스켈레톤 UI 표시", () => {
      cy.intercept("GET", TMDB_POPULAR_URL_PATTERN, (req) => {
        req.reply({ fixture: "popular-movies-p2.json", delay: 1000 });
      }).as("delayedPopularMovies");
      cy.get(".scroll-area").scrollIntoView();
      cy.get(".skeleton-item").should("exist");
      cy.wait("@delayedPopularMovies");
      cy.get(".skeleton-item").should("not.exist");
    });

    it("마지막 페이지 도달 시 하단 스크롤 트리거 요소가 제거된다", () => {
      cy.get(".scroll-area").scrollIntoView();
      cy.wait("@popularMovies");
      cy.get(".scroll-area").should("not.exist");
    });
  });

  context("검색 - 결과 있음", () => {
    it("검색 결과가 1개 이상 표시된다", () => {
      cy.get(".search-input").type("Inception");
      cy.get(".search-submit").click();
      cy.wait("@searchMovies");
      cy.get(".item").its("length").should("be.gte", 1);
    });
  });

  context("검색 - 결과 있는 경우의 재검색", () => {
    it("재검색 시에도 결과가 1개 이상 표시된다", () => {
      cy.get(".search-input").type("Inception");
      cy.get(".search-submit").click();
      cy.wait("@searchMovies");
      cy.get(".item").its("length").should("be.gte", 1);
      cy.get(".search-input").clear().type("Inception");
      cy.get(".search-submit").click();
      cy.wait("@searchMovies");
      cy.get(".item").its("length").should("be.gte", 1);
    });
  });

  context("검색 - 결과 없음", () => {
    it("결과 없음 메시지가 표시된다", () => {
      cy.get(".search-input").type("$$%@@");
      cy.get(".search-submit").click();
      cy.wait("@searchMovies");
      cy.contains("검색 결과가 없습니다");
    });
  });

  context("검색 - 결과 없는 경우의 재검색", () => {
    it("결과 없음 후 재검색 시 결과가 표시된다", () => {
      cy.get(".search-input").type("$$%@@");
      cy.get(".search-submit").click();
      cy.wait("@searchMovies");
      cy.contains("검색 결과가 없습니다");

      cy.get(".search-input").clear().type("Inception");
      cy.get(".search-submit").click();
      cy.wait("@searchMovies");
      cy.get(".item").its("length").should("be.gte", 1);
    });
  });

  context("API 요청 실패", () => {
    it("영화 API 실패 시 토스트 에러가 표시된다", () => {
      cy.intercept("GET", TMDB_POPULAR_URL_PATTERN, { statusCode: 500 }).as("failedPopularMovies");
      cy.visit("localhost:5173");
      cy.wait("@failedPopularMovies");
      cy.get(".toast").should("be.visible");
    });
  });

  context("API 요청 타임아웃", () => {
    it("응답이 지연되면 타임아웃 토스트 에러가 표시된다", () => {
      cy.clock();
      cy.intercept("GET", TMDB_POPULAR_URL_PATTERN, (_req) => {
      }).as("pendingRequest");
      cy.visit("localhost:5173");
      cy.tick(10001);
      cy.get(".toast").should("be.visible");
    });
  });

  context("영화 상세 정보 조회 - 모달", () => {
    beforeEach(() => {
      cy.intercept("GET", TMDB_MOVIE_DETAIL_URL_PATTERN, { fixture: "movie-detail.json" }).as("movieDetail");
    });

    it("영화 클릭 시 상세 정보 모달이 표시된다", () => {
      cy.get(".item:not(.skeleton-item)").first().click();
      cy.wait("@movieDetail");
      cy.get(".modal[open]").should("exist");
      cy.get(".modal-movie-title").should("exist");
    });

    it("닫기 버튼 클릭 시 모달이 닫힌다", () => {
      cy.get(".item:not(.skeleton-item)").first().click();
      cy.wait("@movieDetail");
      cy.get(".modal[open]").should("exist");
      cy.get(".modal-close-button").click();
      cy.get(".modal[open]").should("not.exist");
    });

    it("ESC 키 입력 시 모달이 닫힌다", () => {
      cy.get(".item:not(.skeleton-item)").first().click();
      cy.wait("@movieDetail");
      cy.get(".modal[open]").should("exist");
      cy.get(".modal[open]").trigger("keydown", { key: "Escape", keyCode: 27, which: 27 });
      cy.get(".modal[open]").should("not.exist");
    });
  });

  context("별점 매기기", () => {
    beforeEach(() => {
      cy.intercept("GET", TMDB_MOVIE_DETAIL_URL_PATTERN, { fixture: "movie-detail.json" }).as("movieDetail");
    });

    it("별점 선택 시 localStorage에 별점이 저장된다", () => {
      cy.get(".item:not(.skeleton-item)").first().click();
      cy.wait("@movieDetail");
      cy.get(".star-button[data-rating='8']").click();
      cy.window().then((win) => {
        const ratings = JSON.parse(win.localStorage.getItem("my-ratings") ?? "{}");
        expect(ratings[1523145]).to.equal(8);
      });
    });

    it("새로고침 후에도 선택한 별점이 유지된다", () => {
      cy.get(".item:not(.skeleton-item)").first().click();
      cy.wait("@movieDetail");
      cy.get(".star-button[data-rating='8']").click();
      cy.get(".modal-close-button").click();
      cy.visit("localhost:5173");
      cy.wait("@popularMovies");
      cy.get(".item:not(.skeleton-item)").first().click();
      cy.wait("@movieDetail");
      cy.get(".modal-movie-my-rating-selector").should("have.attr", "data-rating", "8");
    });
  });

  context("URL 페이지 파라미터 기반 페이지 로드", () => {
    it("page=2 URL로 접속 시 첫 번째 API 요청이 2페이지 데이터를 요청한다", () => {
      cy.visit("localhost:5173?page=2");
      cy.wait("@popularMovies").its("request.url").should("include", "page=2");
    });

    it("page=2(마지막 페이지) 접속 시 하단 무한 스크롤 트리거 요소가 존재하지 않는다", () => {
      cy.visit("localhost:5173?page=2");
      cy.wait("@popularMovies");
      cy.get(".scroll-area").should("not.exist");
    });

    it("page=2 접속 후 상단 스크롤 시 1페이지 영화 목록이 추가로 불러와진다", () => {
      cy.visit("localhost:5173?page=2");
      cy.wait("@popularMovies");
      cy.wait("@popularMovies");
      cy.get(".item").should("have.length", 40);
    });
  });

  context("무한 스크롤 API 실패 후 재시도 - 인기영화", () => {
    // beforeEach의 @popularMovies 인터셉트와 우선순위 충돌을 피하기 위해
    // cy.visit으로 새 페이지 로드 후 단일 인터셉트로 모든 요청을 처리한다.
    it("하단 스크롤 중 API 실패 시 스크롤 트리거가 유지된다", () => {
      cy.intercept("GET", TMDB_POPULAR_URL_PATTERN, (req) => {
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        req.reply(page === "2"
          ? { statusCode: 500 }
          : { fixture: "popular-movies-p1.json" });
      }).as("popularWithP2Failure");
      cy.visit("localhost:5173");
      cy.wait("@popularWithP2Failure");
      cy.get(".scroll-area").scrollIntoView();
      cy.wait("@popularWithP2Failure");
      cy.get(".toast").should("be.visible");
      cy.get(".scroll-area").should("exist");
    });

    it("하단 스크롤 중 API 실패 후 해당 페이지가 건너뛰어지지 않는다", () => {
      cy.intercept("GET", TMDB_POPULAR_URL_PATTERN, (req) => {
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        req.reply(page === "2"
          ? { statusCode: 500 }
          : { fixture: "popular-movies-p1.json" });
      }).as("popularWithP2Failure");
      cy.visit("localhost:5173");
      cy.wait("@popularWithP2Failure");
      cy.get(".item").should("have.length", 20);
      cy.get(".scroll-area").scrollIntoView();
      cy.wait("@popularWithP2Failure");
      cy.get(".toast").should("be.visible");
      // 실패 후 아이템 수가 그대로 20개여야 한다 (페이지 건너뜀이 없음)
      cy.get(".item").should("have.length", 20);
      cy.get(".scroll-area").should("exist");
    });
  });

  context("무한 스크롤 API 실패 후 재시도 - 검색", () => {
    it("하단 스크롤 중 API 실패 시 스크롤 트리거가 유지된다", () => {
      cy.intercept("GET", TMDB_SEARCH_URL_PATTERN, (req) => {
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        req.reply(page === "2"
          ? { statusCode: 500 }
          : { fixture: "search-results-p1.json" });
      }).as("searchWithP2Failure");
      cy.visit("localhost:5173/search.html?query=Inception");
      cy.wait("@searchWithP2Failure");
      cy.get(".scroll-area").scrollIntoView();
      cy.wait("@searchWithP2Failure");
      cy.get(".toast").should("be.visible");
      cy.get(".scroll-area").should("exist");
    });

    it("하단 스크롤 중 API 실패 후 해당 페이지가 건너뛰어지지 않는다", () => {
      cy.intercept("GET", TMDB_SEARCH_URL_PATTERN, (req) => {
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        req.reply(page === "2"
          ? { statusCode: 500 }
          : { fixture: "search-results-p1.json" });
      }).as("searchWithP2Failure");
      cy.visit("localhost:5173/search.html?query=Inception");
      cy.wait("@searchWithP2Failure");
      cy.get(".item").should("have.length", 10);
      cy.get(".scroll-area").scrollIntoView();
      cy.wait("@searchWithP2Failure");
      cy.get(".toast").should("be.visible");
      // 실패 후 아이템 수가 그대로 10개여야 한다 (페이지 건너뜀이 없음)
      cy.get(".item").should("have.length", 10);
      cy.get(".scroll-area").should("exist");
    });
  });

  context("스크롤 위치 복원", () => {
    it("viewed-movie-id URL 파라미터로 접속 시 해당 영화가 뷰포트에 표시된다", () => {
      const targetMovieId = "83533";
      cy.visit(`localhost:5173?page=1&viewed-movie-id=${targetMovieId}`);
      cy.wait("@popularMovies");
      cy.get(`[data-movie-id="${targetMovieId}"]`).should(($el) => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top, "영화가 뷰포트 상단 아래에 있어야 함").to.be.lt(Cypress.config("viewportHeight") as number);
        expect(rect.bottom, "영화가 뷰포트 상단 위에 있어야 함").to.be.gt(0);
      });
    });
  });
});
