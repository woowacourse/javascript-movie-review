describe("template spec", () => {
  it("passes", () => {
    cy.viewport(1200, 1000);
    cy.visit("http://localhost:8080/");
  });
});
