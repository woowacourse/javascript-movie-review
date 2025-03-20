const apiKey = Cypress.env("TMDB_API_KEY");
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("홈 화면 테스트", () => {
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

  it("사용자가 홈화면에 접속하면 영화 추천과 20개의 영화 리스트를 본다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });

  it("홈화면에서 더보기 버튼을 누르면 20개의 영화가 추가된다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      let popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
      cy.get("#load-more").scrollIntoView();
      cy.get("#load-more").click();

      popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 40));
    });
  });
});
