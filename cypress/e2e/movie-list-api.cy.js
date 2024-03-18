describe("API 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  // request: https://docs.cypress.io/api/commands/request
  // 환경변수 세팅: https://docs.cypress.io/guides/guides/environment-variables
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    // TODO:
  });
});
