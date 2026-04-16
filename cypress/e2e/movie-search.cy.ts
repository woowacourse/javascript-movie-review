import { searchFixture } from "../../test/fixtures";

import { entries } from "../../src/constants/policy";

describe("영화 검색 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "**/search/movie?page=1&query=%EC%8A%A4%ED%8C%8C%EC%9D%B4",
      {
        statusCode: 200,
        body: {
          page: 1,
          results: [...searchFixture],
          total_pages: 2,
          total_results: 40,
        },
      },
    ).as("getSearchPage1");

    cy.intercept(
      "GET",
      "**/search/movie?page=2&query=%EC%8A%A4%ED%8C%8C%EC%9D%B4",
      {
        statusCode: 200,
        body: {
          page: 2,
          results: [...searchFixture],
          total_pages: 2,
          total_results: 40,
        },
      },
    ).as("getSearchPage2");

    cy.intercept("GET", "**/search/movie?page=1&query=%EB%B7%80", {
      statusCode: 200,
      body: {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      },
    }).as("getSearchNoResult");

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

  it("검색 후 스크롤을 끝까지 내리면 필터링 된 영화 목록이 추가로 출력된다.", () => {
    cy.get("#search-input").type("스파이");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.scrollTo('bottom', { duration: 500 });

    cy.wait("@getSearchPage2");

    cy.get("#movie-list li").should("have.length.greaterThan", entries);
  });

  it("필터링 된 영화 목록이 마지막 페이지면 스크롤을 끝까지 내려도 필터링된 영화 리스트를 더 출력하지 않는다.", () => {
    cy.get("#search-input").type("스파이");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.scrollTo('bottom', { duration: 500 });

    cy.wait("@getSearchPage2");

    cy.get("#movie-list li").then((eleBefore) => {
      const prevLength = eleBefore.length;

      cy.scrollTo('bottom', { duration: 500 });

      cy.get("#movie-list li").should("have.length", prevLength);
    });
  });

  it("검색 결과가 없을 때는 안내메시지를 출력한다.", () => {
    cy.get("#search-input").type("뷀");
    cy.get("#search-button").click();
    cy.wait("@getSearchNoResult");

    cy.get("#no-result").should("be.visible");
  });
});
