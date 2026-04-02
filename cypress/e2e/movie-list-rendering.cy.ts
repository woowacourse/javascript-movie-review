import { moviesFixture } from "../../test/fixtures";

describe("영화 목록 조회 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?page=1", {
      statusCode: 200,
      body: {
        page: 1,
        results: [...moviesFixture],
        total_pages: 2,
        total_results: 40,
      },
    }).as("getPopularPage1");

    cy.intercept("GET", "**/movie/popular?page=2", {
      statusCode: 200,
      body: {
        page: 2,
        results: [...moviesFixture],
        total_pages: 2,
        total_results: 40,
      },
    }).as("getPopularPage2");

    cy.visit("localhost:5173");
    cy.wait("@getPopularPage1");
  });

  it("프로그램을 시작하면 20개의 영화 목록이 렌더링 된다.", () => {
    cy.get("#movie-list li").should("have.length", 20);
  });

  it("더보기 버튼을 누르면 영화 목록이 추가로 생성되어 렌더링 된다.", () => {
    cy.get("#more-button").click();
    cy.wait("@getPopularPage2");

    cy.get("#movie-list li").should("have.length.greaterThan", 20);
  });

  it("마지막 페이지까지 렌더링 됬을때 더보기 버튼을 출력하지 않는다.", () => {
    cy.get("#more-button").click();
    cy.wait("@getPopularPage2");

    cy.get("#more-button").should("not.be.visible");
  });
});
