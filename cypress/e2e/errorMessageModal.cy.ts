describe("영화 리스트 API 에러 발생 시", () => {
  it("에러 메시지 모달이 화면에 표시되어야 한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { statusCode: 500, delay: 100 },
    ).as("getPopularMovies");

    cy.visit("http://localhost:5173");

    cy.wait("@getPopularMovies");

    cy.get(".modal-background") 
      .should("exist")
      .and("be.visible");

    cy.get(".modal-content-box span").should("contain.text", "알 수 없는 오류가 발생했습니다.");
  });
});
