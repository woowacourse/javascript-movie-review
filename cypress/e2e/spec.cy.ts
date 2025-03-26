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

describe("영화 데이터 fetch 에러 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("초기 세팅 영화 데이터 서버 통신 에러 테스트", () => {
    cy.intercept("GET", "https://api.themoviedb.org/3/discover/movie*", {
      statusCode: 200,
      body: {
        results: [],
      },
    }).as("serverError");

    cy.visit("http://localhost:5173");

    cy.wait("@serverError");
    cy.get(".movie-list-error", { timeout: 10000 }).should("exist");
  });

  // it("더보기 버튼 클릭 시 서버 통신 에러 테스트", () => {
  //   cy.intercept("GET", "https://api.themoviedb.org/3/discover/movie*", {
  //     statusCode: 200,
  //     fixture: "movies.json",
  //   }).as("serverError");

  //   cy.visit("http://localhost:5173");

  //   cy.wait("@serverError");
  //   cy.get(".item", { timeout: 10000 }).should("have.length", 20);

  //   cy.intercept("GET", "https://api.themoviedb.org/3/discover/movie*", {
  //     statusCode: 200,
  //     body: {
  //       results: [],
  //     },
  //   }).as("serverError2");

  //   cy.get(".more-button").click();

  //   cy.wait("@serverError2");

  //   cy.get(".more-error", { timeout: 10000 }).should("exist");
  // });
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

  // it("검색 결과 아이콘 클릭 시 서버와의 통신 실패", () => {
  //   cy.intercept("GET", "https://api.themoviedb.org/3/search/movie*", {
  //     statusCode: 500,
  //     body: {},
  //   }).as("serverError");

  //   cy.visit("http://localhost:5173");

  //   cy.get(".search-input").type("미키");
  //   cy.get(".search-button-icon").click();

  //   cy.wait("@serverError");
  //   cy.get(".search-server-error", { timeout: 10000 }).should("exist");
  // });
});
