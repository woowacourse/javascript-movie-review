import {
  interceptPopularPage1,
  interceptPopularPage2,
  interceptSearchPage1,
  interceptSearchPage2,
} from "./spec";

describe("메인 단계 영화 결과 더 보기 버튼 클릭했을 때 동작 테스트", () => {
  it("더 보기 버튼 클릭 시 기존 영화 목록에 추가 영화가 append된다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    cy.get("#main-thumbnail-list li").then(($initialItems) => {
      const initialCount = $initialItems.length;

      interceptPopularPage2();
      cy.get("#main-see-more-button").click();
      cy.wait("@getPopularPage2");

      cy.get("#main-thumbnail-list li").should(
        "have.length.greaterThan",
        initialCount,
      );
    });
  });
});

describe("검색 단계 영화 결과 더 보기 버튼 클릭했을 때 동작 테스트", () => {
  it("검색 후 더 보기 버튼 클릭 시 기존 검색 결과에 추가 결과가 append된다", () => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");

    interceptSearchPage1();
    cy.get("#search-input").type("인터스텔라");
    cy.get("#search-button").click();
    cy.wait("@getSearchPage1");

    cy.get("#search-thumbnail-list li").then(($initialItems) => {
      const initialCount = $initialItems.length;

      interceptSearchPage2();
      cy.get("#search-see-more-button").click();
      cy.wait("@getSearchPage2");

      cy.get("#search-thumbnail-list li").should(
        "have.length.greaterThan",
        initialCount,
      );
    });
  });
});
