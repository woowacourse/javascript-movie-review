/// <reference types="cypress" />

describe.skip("비동기 API 테스트", () => {
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.visit("localhost:5173");

    const MOVIE_URL = "https://api.themoviedb.org/3/movie/popular";
    const params = new URLSearchParams({
      language: "ko-KR",
      page: "1",
    });
    const popularMovieUrl = MOVIE_URL + "?" + params.toString();

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.request({
      method: "GET",
      url: popularMovieUrl,
      ...options,
    }).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
  });
});

describe("인기 있는 영화 페이지 E2E 테스트 ", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies).to.have.length(20);
      cy.get(".thumbnail-list > li").should("have.length", 20);
    });
  });

  it("무한 스크롤 시 추가 영화 목록이 계속해서 추가되어야 한다.", () => {
    // 최초 20개 확인
    cy.get(".thumbnail-list > li").should("have.length", 20);
    // 스크롤하여 다음 페이지 로드 (20개 추가 -> 40개)
    cy.scrollTo("bottom");
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 40);
  });

  it("마지막 페이지에서는 추가 데이터 요청이 발생하지 않아야 한다.", () => {
    // 마지막 페이지: 3
    cy.get(".thumbnail-list > li").should("have.length", 20);
    cy.scrollTo("bottom");
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 40);
    cy.scrollTo("bottom");
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 60);
    // 마지막 페이지 이후에는 sentinel이 제거되어야 함.
    cy.get(".scroll-sentinel").should("not.exist");
  });

  it("가장 인기있는 영화가 상단에 떠야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      const topRatedMovie = popularMovies[0];

      cy.get(".top-rated-movie .title")
        .should("exist")
        .should("have.text", topRatedMovie.title);
    });
  });

  context("데이터 준비 및 상태 표시 테스트", () => {
    it("로딩 중일 때 로딩 스피너가 표시되어야 한다.", () => {
      // 요청에 delay를 주어 로딩 상태 구현
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        {
          fixture: "movie-popular.json",
          delayMs: 3000,
        }
      ).as("delayedMovies");

      cy.visit("localhost:5173");
      // 스켈레톤이 표시되어야 함
      cy.get(".skeleton-item").should("be.visible");
      cy.wait("@delayedMovies");
      // 로딩 스피너가 사라진 후 영화 목록이 렌더링 되어야 함
      cy.get(".skeleton-item").should("not.exist");
    });

    it("통신 중 에러가 발생하면 에러 메시지가 표시되어야 한다.", () => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        {
          statusCode: 500,
          body: { error: "Internal Server Error" },
        }
      ).as("errorMovies");

      cy.visit("localhost:5173");
      cy.wait("@errorMovies");
      cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
    });

    it("서버가 403을 반환하면 에러 처리되어야 한다.", () => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        {
          statusCode: 403,
          body: { error: "Forbidden" },
        }
      ).as("forbiddenMovies");

      cy.visit("localhost:5173");
      cy.wait("@forbiddenMovies");
      cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
    });

    it("로딩 시간이 10초가 넘어가면 타임아웃 처리가 되어야 한다.", () => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        {
          fixture: "movie-popular.json",
          delayMs: 11000,
        }
      ).as("timeoutMovies");

      cy.visit("localhost:5173");
      // 10초 후 에러 표시
      cy.wait("@timeoutMovies");
      cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
    });

    it("오프라인 상태일 때 적절한 에러 메시지가 표시되어야 한다.", () => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        { forceNetworkError: true }
      ).as("offlineMovies");

      cy.visit("localhost:5173");
      cy.wait("@offlineMovies");
      cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
    });
  });
});
