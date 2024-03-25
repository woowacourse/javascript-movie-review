import { TITLE_TEXT } from "../../src/constant/setting";

describe("영화 리뷰 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.viewport(550, 950);
  });

  it("첫 페이지 로딩시 지금 인기 있는 영화를 확인할 수 있다.", () => {
    cy.get("h2").should("contain", TITLE_TEXT.POPULAR);
  });

  it("한 페이지당 20개의 영화 목록을 확인할 수 있다.", () => {
    cy.get(".item-list").find("li").should("have.length", 20);
  });

  it("인기순 목록에서 더보기를 누르면 목록이 20개 추가된다.", () => {
    cy.get(".popularMoreMoviesButton").click({ force: true });
    cy.get(".item-list").find("li").should("have.length", 40);
  });

  it("입력한 검색어가 포함된 검색 결과를 확인할 수 있다.", () => {
    cy.get(".search-input").type("짱구");
    cy.get(".search-box").submit();
    cy.get(".item-list li").each(($li) => {
      cy.wrap($li).find(".item-title").should("contain", "짱구");
    });
  });
});
