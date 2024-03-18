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
    cy.wait("@getPopularMovies").then((interception) => {
      console.log(interception);

      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);
    });
  });
});
