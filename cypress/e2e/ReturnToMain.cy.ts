import { interceptPopularPage1, interceptSearchPage1 } from "./spec";

describe("검색 작업 후 로고를 클릭했을 때 메인으로 복귀 동작 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("인터스텔라");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get("#logo").click();
    cy.wait("@getPopularPage1");
  });

  it("URL에서 keyword parameter가 제거된다", () => {
    cy.url().should("not.include", "keyword");
  });

  it("banner가 렌더링된다", () => {
    cy.get("#background-container").should("be.visible");
  });

  it("main-thumbnail-list가 렌더링된다", () => {
    cy.get("#main-thumbnail-list").should("be.visible");
  });
});

describe("검색 작업 후 빈 문자열을 입력했을 때 메인으로 복귀 동작 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("인터스텔라");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get("#search-input").clear();
    cy.get("#search-button").click();
    cy.wait("@getPopularPage1");
  });

  it("URL에서 keyword parameter가 제거된다", () => {
    cy.url().should("not.include", "keyword");
  });

  it("banner가 렌더링된다", () => {
    cy.get("#background-container").should("be.visible");
  });

  it("main-thumbnail-list가 렌더링된다", () => {
    cy.get("#main-thumbnail-list").should("be.visible");
  });
});
