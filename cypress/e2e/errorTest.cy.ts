it("초기 로딩 실패 시 에러 메시지를 보여준다.", () => {
  cy.intercept("GET", "**/movie/popular**", {
    statusCode: 500,
    body: {},
  }).as("getPopularMovies");

  cy.visit("http://localhost:5173");
  cy.wait("@getPopularMovies");

  cy.get(".search-error-text").should(
    "contain.text",
    "영화 목록을 불러오지 못했습니다.",
  );
});
