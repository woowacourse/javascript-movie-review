describe("more btn test", () => {
  it("페이지 접속 후 더보기 버튼을 1번 누르면 영화 개수가 40개가 된다.", () => {
    cy.visit("localhost:5173");

    cy.get(".item").should("have.length", 20);

    cy.get(".display-more-btn").click();

    cy.get(".item").should("have.length", 40);
  });
  it("페이지 접속 후 더보기 버튼을 10번 누르면 영화 개수가 220개가 된다.", () => {
    cy.visit("localhost:5173");
    cy.get(".item").should("have.length", 20);
    for (let i = 0; i < 10; i++) {
      cy.get(".display-more-btn").click();
    }
    cy.get(".item").should("have.length", 220);
  });
});
