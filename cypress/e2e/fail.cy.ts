describe("API 요청 실패 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      {
        statusCode: 500,
        body: { message: "영화 정보를 불러오는 데 실패했습니다." },
      }
    ).as("getPopularMoviesError");

    cy.visit("http://localhost:5173");
  });

  it("API 호출 실패 시 alert 메시지가 표시되어야 한다", () => {
    cy.wait("@getPopularMoviesError").then((interception) => {
      expect(interception.response?.statusCode).to.equal(500);
    });

    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include("영화 정보를 불러오는 데 실패했습니다.");
      return false;
    });

    cy.on("window:alert", (str) => {
      expect(str).to.equal("영화 정보를 불러오는 데 실패했습니다.");
    });
  });
});
