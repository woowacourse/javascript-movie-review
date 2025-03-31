///  <reference types="cypress" />

describe("영화 검색 비동기 API 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("미키 17 검색하면 1개만 나오고 '더보기' 버튼이 존재하지 않아야 한다", () => {
    cy.get("#search-bar").type("미키 17");

    cy.get(".search-icon").click();
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 1);
    cy.get(".see-more").should("not.exist");
  });

  it("짱구 검색하면 20개 나오고 '더보기' 버튼이 존재해야 한다.", () => {
    cy.get("#search-bar").type("짱구");
    cy.get(".search-icon").click();

    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);
    cy.get(".see-more").should("exist");
  });

  it("짱구를 검색한 후 페이지 하단으로 스크롤하면 영화가 추가로 표시되고 '더보기' 버튼이 존재하지 않아야 한다", () => {
    cy.get("#search-bar").type("짱구");
    cy.get(".search-icon").click();
    cy.scrollTo("bottom");

    cy.get(".thumbnail-list")
      .find(".thumbnail")
      .should("have.length.at.most", 40);
    cy.get(".see-more").should("not.exist");
  });
});
