describe("template spec", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("처음 사이트를 방문하면 헤더, 영화 리스트 컨테이너, 더보기 버튼을 렌더링 해야한다.", () => {
    cy.get("header").should("exist");

    cy.get(".item-view").should("exist");

    cy.get(".more").should("exist");
  });
});
