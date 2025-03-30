const apiKey = Cypress.env("TMDB_API_KEY");
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("무한 스크롤 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit(localHostUrl);
  });

  it("사용자가 현재 보이는 화면 끝까지 내리며 새로운 영화 정보를 불러온다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      let popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));

      cy.get("#sentinel").scrollIntoView();

      popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 40));
    });
  });
});
