describe("디테일 화면 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.wait(1000);
  });

  it("클릭한 별점대로 별점 설명서와 점수가가 바뀐다.", () => {
    cy.get(".primary").click();

    cy.get(".star-rating .stars").children().eq(2).click();

    cy.get(".description-score .description")
      .invoke("text")
      .should("eq", "보통이에요");

    cy.get(".description-score .check-score").invoke("text").should("eq", "6");
  });

  it("별점을 한번 등록한 후 모달창을 껐다 켜도 해당 별점이 표시되어 있다.", () => {
    cy.get(".primary").click();

    cy.get(".star-rating .stars").children().eq(2).click();
    cy.get(".close-modal").click();
    cy.get(".primary").click();

    cy.get(".description-score .description")
      .invoke("text")
      .should("eq", "보통이에요");

    cy.get(".description-score .check-score").invoke("text").should("eq", "6");
  });
});
