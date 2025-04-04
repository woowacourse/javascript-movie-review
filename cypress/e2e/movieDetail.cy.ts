describe("영화 상제 정보 테스트", () => {
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
  
    it("영화 목록의 영화를 클릭하면 상세 정보가 담긴 모달이 열린다", () => {
      cy.wait("@getPopularMovies").then(() => {
        cy.get(".modal").should("be.visible");

        cy.get("h2")
        .eq(1)
        .should("have.text", "미키 17")
      });
    });
  });
  