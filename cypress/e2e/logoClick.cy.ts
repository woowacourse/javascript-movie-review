const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("로고 클릭 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      (req) => {
        if (req.query.page === "1" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search1.json" });
        } else if (req.query.page === "2" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search2.json" });
        }
      }
    );
    cy.visit(localHostUrl);
  });

  it("검색한후 로고를 누르면 영화 추천과 20개의 영화 리스트를 본다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });

    cy.get("#thumbnail-list > li").should("have.length", 20);
    cy.scrollTo("bottom");
    cy.get("#thumbnail-list > li").should("have.length", 40);

    const searchValue = "짱구";
    cy.get(".search-bar").type(`${searchValue}{enter}`);

    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", searchValue);
    });
    cy.scrollTo("bottom");
    cy.get("#thumbnail-list > li").each(($li) => {
      cy.wrap($li).should("contain.text", "짱구");
    });

    cy.get("#logo > img").click();
    cy.scrollTo("bottom");
    cy.get("#thumbnail-list > li").should("have.length", 40);
  });
});
