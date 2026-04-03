import { interceptPopularPage1, interceptSearchPage1 } from "./spec";

describe("검색 버튼 클릭했을 때 동작 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("the");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");
  });

  it("URL에 keyword parameter가 추가된다", () => {
    cy.url().should("include", "keyword=the");
  });

  it("subtitle이 '\"the\" 검색 결과'로 변경된다", () => {
    cy.get("#sub-title").should("contain.text", "the");
    cy.get("#sub-title").should("contain.text", "검색 결과");
  });

  it("search-thumbnail-list가 렌더링된다", () => {
    cy.get("#search-thumbnail-list").should("be.visible");
  });
});

describe("검색 인풋에 엔터 입력했을 때 동작 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("the{enter}");
    cy.wait("@getSearchPage1");
  });

  it("URL에 keyword parameter가 추가된다", () => {
    cy.url().should("include", "keyword=the");
  });

  it("subtitle이 '\"the\" 검색 결과'로 변경된다", () => {
    cy.get("#sub-title").should("contain.text", "the");
    cy.get("#sub-title").should("contain.text", "검색 결과");
  });

  it("search-thumbnail-list가 렌더링된다", () => {
    cy.get("#search-thumbnail-list").should("be.visible");
  });
});
