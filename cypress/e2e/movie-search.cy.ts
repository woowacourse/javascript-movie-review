import { searchFixture } from "../../test/fixtures";
import { mockSearchPage } from "../support/movie";

describe("영화 검색 기능 테스트", () => {
  beforeEach(() => {
    mockSearchPage({
      query: "스파이",
      page: 1,
      results: searchFixture,
      totalPages: 2,
      totalResults: 40,
    });

    mockSearchPage({
      query: "스파이",
      page: 2,
      results: searchFixture,
      totalPages: 2,
      totalResults: 40,
    });

    cy.intercept(
      "GET",
      "**/search/movie?page=1&query=%EB%B7%80&language=ko-KR",
      {
        statusCode: 200,
        body: {
          page: 1,
          results: [],
          total_pages: 1,
          total_results: 0,
        },
      },
    ).as("getSearchNoResult");

    cy.visit("localhost:5173");
  });

  it("검색어를 입력하고 검색 버튼을 클릭하면 필터링 된 영화 목록이 출력된다.", () => {
    cy.get("#search-input").type("스파이");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get("#movie-list li").should("have.length.greaterThan", 0);
  });

  it("검색어를 입력하고 엔터를 치면 필터링 된 영화 목록이 출력된다.", () => {
    cy.get("#search-input").type("스파이");
    cy.get("#search-button").type("{enter}");
    cy.wait("@getSearchPage1");

    cy.get("#movie-list li").should("have.length.greaterThan", 0);
  });

  it("검색 후 스크롤을 내려 sentinel 요소가 보이면 필터링 된 영화 목록이 추가로 출력된다.", () => {
    cy.get("#search-input").type("스파이");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get(".scroll-sentinel").scrollIntoView();
    cy.wait("@getSearchPage2");

    cy.get("#movie-list li").should("have.length", 40);
  });

  it("필터링 된 영화 목록이 마지막 페이지면 sentinel 요소가 보여도 추가로 요청하지 않는다.", () => {
    cy.get("#search-input").type("스파이");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get(".scroll-sentinel").scrollIntoView();
    cy.wait("@getSearchPage2");

    cy.get(".scroll-sentinel").scrollIntoView();
    cy.get("#movie-list li").should("have.length", 40);
  });

  it("검색 결과가 없을 때는 안내메시지를 출력한다.", () => {
    cy.get("#search-input").type("뷀");
    cy.get("#search-button").click();
    cy.wait("@getSearchNoResult");

    cy.get("#no-result").should("be.visible");
  });
});
