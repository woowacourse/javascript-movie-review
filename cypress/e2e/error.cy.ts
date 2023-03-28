describe("오류 테스트", () => {
  it("비정상적인 api 주소를 받아왔을 때 에러 이미지 출력", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { statusCode: 404 }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8081/");

    cy.wait("@getPopularMovies").then((interception) => {
      cy.get(".error-container").should("be.visible");
    });
  });
});
