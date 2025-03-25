/// <reference types="cypress" />

describe("영화 fixture관련 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/discover/movie*",
      (req) => {
        req.reply({ fixture: "movies.json" });
      }
    ).as("fetchMovies");

    cy.visit("http://localhost:5173");
  });

  it("초기 fetchData 시 영화 목록이 20개인지 확인", () => {
    cy.wait("@fetchMovies").then((interception) => {});

    cy.get(".item", { timeout: 10000 }).should("have.length", 20);
  });

  it("영화 검색 기능 테스트", () => {
    cy.get(".search-input").type("미키");
    cy.get(".search-button-icon").click();
    cy.get(".item").should("have.length.at.least", 1);
  });

  it("영화 목록 더보기 기능 테스트", () => {
    cy.get(".more-button", { timeout: 10000 }).click();
    cy.get(".item").should("have.length.at.least", 21);
  });
});

describe("에러처리 테스트 실제 API 접근", () => {
  it("영화 목록 불러오기 실패 - 서버 에러", () => {
    // 서버 에러(500) 시뮬레이션
    cy.intercept("GET", "https://api.themoviedb.org/3/discover/movie*", {
      statusCode: 500,
      body: {
        success: false,
        status_message: "Internal server error",
      },
    }).as("serverError");

    cy.visit("http://localhost:5173");
    cy.wait("@serverError");
    cy.get(".movie-list-error", { timeout: 10000 }).should("exist");
    cy.get(".movie-list-error").should("contain.text", "에러가 발생했습니다");
  });

  it("영화 목록 불러오기 실패 - 잘못된 응답 형식", () => {
    // 성공 상태 코드지만 잘못된 데이터 형식 반환
    cy.intercept("GET", "https://api.themoviedb.org/3/discover/movie*", {
      statusCode: 200,
      body: {
        success: true,
        // results 배열이 없는 잘못된 응답 형식
      },
    }).as("invalidFormat");

    cy.visit("http://localhost:5173");
    cy.wait("@invalidFormat");
    cy.get(".item", { timeout: 10000 }).should("have.length", 0);
  });
});

describe("영화 검색 에러 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("검색 결과가 없을 때 검색 결과 표시 확인", () => {
    cy.get(".search-input").type("asdlkfnalksdfnal;wefn");
    cy.get(".search-button-icon").click();
    cy.get(".item", { timeout: 10000 }).should("have.length", 0);
  });

  it("검색 결과 아이콘 클릭 시 서버와의 통신 실패", () => {
    cy.intercept("GET", "https://api.themoviedb.org/3/search/movie*", {
      statusCode: 200,
      body: {
        results: [],
      },
    }).as("serverError2");

    cy.visit("http://localhost:5173");

    cy.get(".search-input").type("미키");
    cy.get(".search-button-icon").click();

    cy.wait("@serverError2");
    cy.get(".no-results", { timeout: 10000 }).should("exist");
  });
});
