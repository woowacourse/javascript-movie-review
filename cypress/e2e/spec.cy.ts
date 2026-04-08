describe("영화 리뷰 웹 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("초기 진입 시 인기영화 목록이 표시된다", () => {
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".btn-more").should("be.visible");
  });

  it("더보기 클릭 시 영화 카드가 추가된다", () => {
    cy.get(".thumbnail-list li")
      .its("length")
      .then((before) => {
        cy.get(".btn-more").click();
        cy.get(".thumbnail-list li").should("have.length.greaterThan", before);
      });
  });

  it("검색어 입력 시 검색 결과가 표시된다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("빈 검색어 제출 시 인기영화로 돌아온다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");

    cy.get(".search-input").clear();
    cy.get(".search-form").submit();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("로고 클릭 시 홈으로 돌아온다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");

    cy.get(".logo").click();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });
});
