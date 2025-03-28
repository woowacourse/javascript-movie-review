/// <reference types="cypress" />

describe.skip("비동기 API 테스트", () => {
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.visit("localhost:5173");

    const MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
    const params = new URLSearchParams({
      query: "짱구",
      language: "ko-KR",
      page: "1",
    });
    const searchMovieUrl = MOVIE_URL + "?" + params.toString();

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
      },
    };

    cy.request({
      method: "GET",
      url: searchMovieUrl,
      ...options,
    }).as("searchedMovies");

    cy.get("@searchedMovies").its("status").should("eq", 200);
    cy.get("@searchedMovies").its("body.results").should("have.length", 20);
  });
});

describe("검색 기능 E2E 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-searched.json" }
    ).as("getSearchedMovies");

    cy.visit("localhost:5173");
  });

  it("검색어 입력 후 검색 버튼을 클릭하면 API가 호출되고 결과가 표시되어야 한다.", () => {
    cy.get("form.search-bar input").should("exist").type("짱구");
    cy.get('form.search-bar button[type="submit"]').should("exist").click();

    cy.wait("@getSearchedMovies").then((interception) => {
      if (!interception.response) throw new Error("No response received");
      const searchedMovies = interception.response.body.results;
      expect(searchedMovies.length).to.equal(20);
      cy.get(".thumbnail-list > li").should("have.length", 20);
    });
  });

  it("검색어 입력 후 Enter 키를 누르면 API가 호출되고 결과가 표시되어야 한다.", () => {
    cy.get("form.search-bar input").should("exist").type("짱구{enter}");

    cy.wait("@getSearchedMovies").then((interception) => {
      if (!interception.response) throw new Error("No response received");
      const searchedMovies = interception.response.body.results;
      expect(searchedMovies.length).to.equal(20);
      cy.get(".thumbnail-list > li").should("have.length", 20);
    });
  });

  it("무한 스크롤 시 추가 영화 목록이 계속해서 추가되어야 한다.", () => {
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.wait("@getSearchedMovies");

    // 최초 20개 항목 확인
    cy.get(".thumbnail-list > li").should("have.length", 20);
    // 스크롤하여 추가 데이터를 로드 (추가 20개 -> 40개)
    cy.scrollTo("bottom");
    cy.wait("@getSearchedMovies");
    cy.get(".thumbnail-list > li").should("have.length", 40);
  });

  it("마지막 페이지에서는 추가 데이터 요청이 발생하지 않아야 한다.", () => {
    // 총 2페이지
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.wait("@getSearchedMovies");
    cy.get(".thumbnail-list > li").should("have.length", 20);

    cy.scrollTo("bottom");
    cy.wait("@getSearchedMovies");
    cy.get(".thumbnail-list > li").should("have.length", 40);

    // 마지막 페이지이므로 sentinel 요소가 제거되어야 함.
    cy.get(".scroll-sentinel").should("not.exist");
  });
});

describe("검색 결과가 없을 때 E2E 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-not-found.json" }
    ).as("getNotFound");

    cy.visit("localhost:5173");
  });

  it("검색 결과가 없을 때 사용자에게 알려준다", () => {
    cy.get("form.search-bar input")
      .should("exist")
      .type("ㅁ닝러ㅏ인러ㅏㅣㅇ너라ㅣ어라ㅣㅇ");
    cy.get('form.search-bar button[type="submit"]').should("exist").click();

    cy.wait("@getNotFound").then((interception) => {
      if (!interception.response) throw new Error("No response received");
      const searchedMovies = interception.response.body.results;
      expect(searchedMovies.length).to.equal(0);
      cy.get(".fallback-screen p").should(
        "have.text",
        "현재 표시할 영화가 없습니다"
      );
    });
  });
});

describe("네트워크 상태 및 데이터 준비 상태 테스트", () => {
  it("로딩 중일 때 스켈레톤 UI가 표시되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-searched.json", delayMs: 3000 }
    ).as("delayedSearch");

    cy.visit("localhost:5173");
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.get(".skeleton-item").should("be.visible");
    cy.wait("@delayedSearch");
    cy.get(".skeleton-item").should("not.exist");
  });

  it("통신 중 에러 발생 시 에러 메시지가 표시되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { statusCode: 500, body: { error: "Internal Server Error" } }
    ).as("errorSearch");

    cy.visit("localhost:5173");
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.wait("@errorSearch");
    cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
  });

  it("서버가 403을 반환하면 에러 처리가 되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { statusCode: 403, body: { error: "Forbidden" } }
    ).as("forbiddenSearch");

    cy.visit("localhost:5173");
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.wait("@forbiddenSearch");
    cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
  });

  it("로딩 시간이 10초를 초과하면 타임아웃 처리되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-searched.json", delayMs: 11000 }
    ).as("timeoutSearch");

    cy.visit("localhost:5173");
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.wait("@timeoutSearch");
    cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
  });

  it("오프라인 상태이면 적절한 에러 메시지가 표시되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { forceNetworkError: true }
    ).as("offlineSearch");

    cy.visit("localhost:5173");
    cy.get("form.search-bar input").type("짱구{enter}");
    cy.wait("@offlineSearch");
    cy.get(".error-screen p").should("contain.text", "오류가 발생했습니다.");
  });
});
