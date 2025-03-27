/// <reference types="cypress" />

import "./support/commands";

describe("사용자는 영화 목록을 조회하고 검색할 수 있다", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.viewport(1280, 720);
  });

  it("정상적으로 페이지에 접속한 경우 영화 20개가 보인다.", () => {
    cy.get(".thumbnail-list").find(".item").should("have.length", 20);
  });

  it("짱구를 검색했을 경우 '짱구 스트리트 화이어 2' 영화가 보여진다.", () => {
    cy.searchMovie("짱구");
    cy.get(".thumbnail-list").contains("짱구 스트리트 화이어 2");
  });

  it("더보기 버튼을 누르면 영화가 추가로 보여진다. ", () => {
    cy.get(".more").click();
    cy.get(".thumbnail-list")
      .find(".item")
      .should("have.length.greaterThan", 20);
  });

  it("더보기 버튼을 눌렀을 때, 더 보여질 영화가 없으면 더보기 버튼이 사라진다. ", () => {
    cy.searchMovie("짱구");
    cy.get(".more").click();
    cy.get(".more").should("not.be.visible");
  });

  it("검색 결과가 없을 때, '검색 결과가 없습니다' 문구가 보인다. ", () => {
    cy.searchMovie("앎으우구");
    cy.get(".nothing-text").contains("검색 결과가 없습니다.");
  });
});
