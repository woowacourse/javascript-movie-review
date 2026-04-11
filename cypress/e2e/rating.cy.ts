describe("로컬스토리지 평점 저장 테스트", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.intercept("GET", "**/movie/popular**", { fixture: "movies.json" }).as(
      "getMovies",
    );
    cy.intercept("GET", "**/movie/1001**", { fixture: "moviedetail.json" }).as(
      "getMovieDetail",
    );
    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.get(".thumbnail-list li").first().find(".item").click();
    cy.wait("@getMovieDetail");
  });

  it("별점을 클릭하면 로컬스토리지에 저장된다", () => {
    cy.get(".my-rate-stars .my-star").eq(3).click();
    cy.window()
      .its("localStorage")
      .invoke("getItem", "movieRatings")
      .then((val) => {
        if (val) {
          expect(JSON.parse(val)).to.deep.equal({ "1001": 8 });
        }
      });
  });

  it("새로고침 후 같은 영화 모달을 열면 저장된 평점이 유지된다", () => {
    cy.get(".my-rate-stars .my-star").eq(3).click();
    cy.reload();
    cy.wait("@getMovies");
    cy.get(".thumbnail-list li").first().find(".item").click();
    cy.wait("@getMovieDetail");

    cy.get(".my-rate-stars .my-star").each((star, index) => {
      if (index <= 3) {
        cy.wrap(star)
          .should("have.attr", "src")
          .and("include", "star_filled.png");
      } else {
        cy.wrap(star)
          .should("have.attr", "src")
          .and("include", "star_empty.png");
      }
    });
    cy.get(".my-score-label").should("contain", "재미있어요");
    cy.get(".my-rate-value").should("contain", "(8/10)");
  });
});
