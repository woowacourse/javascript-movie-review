describe("오류 테스트", () => {
  it("404 에러가 났을 때 에러에 해당하는 문구를 출력한다.", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 404, body: { status_code: 34 } }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8080/");

    cy.wait("@getPopularMovies").then(() => {
      cy.get(".error-message").should(
        "contain",
        "요청한 리소스를 찾을 수 없습니다."
      );
    });
  });
});
