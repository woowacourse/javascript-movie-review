describe("영화 목록 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("맨 처음 상위 영화 20개가 표시된다.", () => {
    cy.get("ul.thumbnail-list li").should("have.length", 20);
  });

  it("더보기 버튼을 누르면 다음 페이지 20개가 추가로 표시된다.", () => {
    cy.get("main section button.primary").click();
    cy.get("ul.thumbnail-list li").should("have.length", 40);
  });
});
