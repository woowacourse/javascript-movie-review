describe("별점 매기기 테스트", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        { fixture: "movie-popular.json" }
      ).as("getPopularMovies");
  
      cy.visit("http://localhost:5173");

      cy.get(".item")
      .eq(0)
      .click();
    });
  
    it("별점 미등록 시 myRating은 0점이다", () => {
      cy.wait("@getPopularMovies").then(() => {
        cy.get(".my-rating-text")
        .should("have.text", "0/10")
      });
    });

    it("star button 클릭 시 별점 반영", () => {
        cy.wait("@getPopularMovies").then(() => {
          cy.get(".star-button")
          .eq(0)
          .click();
        cy.get(".my-rating-text")
          .should("have.text", "2/10")
        });

        cy.get(".star-button")
          .eq(3)
          .click();
        cy.get(".my-rating-text")
          .should("have.text", "8/10")
      });
  });
  