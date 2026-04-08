describe("라우팅", () => {
  it("존재하지 않는 경로 접근 시 메인으로 리다이렉트한다", () => {
    cy.visit("/unknown-path");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get(".item").should("have.length", 20);
  });

  it("로고 클릭 시 메인 페이지로 이동한다", () => {
    cy.visit(`/search?query=${encodeURIComponent("인터스텔라")}`);
    cy.get("a.logo").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get(".item").should("have.length", 20);
  });

  it("검색 후 로고 클릭 시 인기 영화 목록을 다시 로드한다", () => {
    cy.visit("/");
    cy.get(".search-input").type("인터스텔라");
    cy.get(".search-form").submit();
    cy.get("a.logo").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get(".item").should("have.length", 20);
  });
});
