describe("사용자는 영화에 대해 별점을 줄 수 있다.", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/*/,
      },
      { fixture: "kungfupandaMovieDetails.json" }
    ).as("getKungfupandaDetails");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "popularMovieList.json" }
    ).as("getPopularMovies");

    cy.visit("/");

    cy.get("ul.item-list").children().first().click();
    cy.get(".modal").should("have.class", "modal--open");
  });

  it("사용자는 영화에 대해 별점을 줄 수 있다.", () => {
    cy.get("input.star-range-input")
      .invoke("val", 3)
      .trigger("input")
      .trigger("change");

    cy.get(".rating-result").contains(6);
    cy.get(".rating-result").contains("보통이에요");
  });

  it("새로고침 이후에도 사용자가 매긴 별점이 유지된다.", () => {
    cy.get("input.star-range-input")
      .invoke("val", 3)
      .trigger("input")
      .trigger("change");

    cy.get(".rating-result").contains(6);
    cy.get(".rating-result").contains("보통이에요");

    cy.reload();

    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        "http://localhost:8080": {
          userMovieList: '[{"id":0,"userRating":3}]',
        },
      });
    });
  });
});
