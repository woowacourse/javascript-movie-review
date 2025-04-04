describe("에러 모달 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/,
      },
      {
        statusCode: 500,
      },
    ).as("getPopularMoviesWithError");

    // uncaught 에러가 Cypress 테스트를 fail 시키지 않도록 방지
    Cypress.on("uncaught:exception", () => false);

    cy.visit("http://localhost:5173");
  });

  it("API 호출 실패 시 에러 모달이 나타나야 한다", () => {
    cy.wait("@getPopularMoviesWithError");

    cy.get("dialog.modal-container").should("be.visible").and("contain.text", "알 수 없는 오류가 발생했습니다.");
  });
});
