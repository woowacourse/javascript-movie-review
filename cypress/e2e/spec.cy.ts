const TMDB_POPULAR_URL_PATTERN = "**/movie/popular**";
const TMDB_SEARCH_URL_PATTERN = "**/search/movie**";

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

  context("Movie List 탐색", () => {
    it("초기 목록 20개 표시 후 더보기 클릭 시 40개 표시", () => {
      cy.get(".item").should("have.length", 20);
      cy.get(".show-more-button").click();
      cy.wait("@popularMovies");
      cy.get(".item").should("have.length", 40);
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
      cy.get(".toast-title").should("contain", "API 에러");
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
      cy.get(".toast-title").should("contain", "API 에러");
      cy.get(".toast-message").should("contain", "응답 시간");
    });
  });
});
