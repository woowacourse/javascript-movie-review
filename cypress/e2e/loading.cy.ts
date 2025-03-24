describe("API 요청 로딩 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      (req) => {
        req.on("response", (res) => {
          res.setDelay(2000);
        });
      }
    ).as("getPopularMoviesDelayed");

    cy.visit("http://localhost:5173");
  });

  it("API 호출 중 로딩 상태 UI가 표시되어야 한다", () => {
    cy.get("[data-testid='movie-list']").within(() => {
      cy.get(".skeleton-item").should("exist");
    });

    cy.wait("@getPopularMoviesDelayed");
    cy.get("[data-testid='movie-list'] > li").should("have.length", 20);
  });
});
