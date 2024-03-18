describe("Fixture를 이용한 테스트", () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:8080");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    // TODO:
  });
});
