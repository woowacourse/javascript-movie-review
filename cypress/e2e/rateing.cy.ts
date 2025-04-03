const apiKey = Cypress.env("TMDB_API_KEY");
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

function clickStarAndCheck(index: number, message: string, scoreText: string) {
  getStar().should("have.length", 5).eq(index).click();
  getModal().should("contain", message).and("contain", scoreText);
  checkStarSrc(index);
}

function checkStarSrc(index: number) {
  getStar().each(($star, i) => {
    const expectedSrc = i <= index ? "star_filled.png" : "star_empty.png";

    cy.wrap($star).should("have.attr", "src").and("include", expectedSrc);
  });
}

function getStar() {
  return cy.get(".estimate-star");
}

function getModal() {
  return cy.get("#modalBackground");
}

describe("별점 테스트", () => {
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

  it("상세 보기 모달에서 평점을 메길 수 있다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }

      cy.get("#thumbnail-list > li").should("have.length", 20).first().click();
      getModal().should("be.visible");

      clickStarAndCheck(0, "최악이에요", "(2/10)");
      clickStarAndCheck(1, "별로예요", "(4/10)");
      clickStarAndCheck(2, "보통이에요", "(6/10)");
      clickStarAndCheck(3, "재미있어요", "(8/10)");
      clickStarAndCheck(4, "명작이에요", "(10/10)");
    });
  });

  it("별점을 메기고 모달에 다시 들어와도 데이터가 유지된다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }

      cy.get("#thumbnail-list > li").should("have.length", 20).first().click();
      getModal().should("be.visible");

      clickStarAndCheck(0, "최악이에요", "(2/10)");
      cy.get("body").type("{esc}");

      cy.get("#thumbnail-list > li").should("have.length", 20).first().click();
      getModal().should("contain", "최악이에요").should("contain", "(2/10)");
      checkStarSrc(0);
    });
  });
});
