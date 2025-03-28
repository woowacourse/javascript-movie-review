const localHostUrl = Cypress.env("LOCAL_HOST_URL");
describe("details 테스트", () => {
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

  it("별점이 매겨지면 기록으로 남아야 된다.", () => {
    // 테스트용 뷰포트에 에러가 있어서, 이경우에만 이렇게 쓰는것으로 했습니다.
    cy.get("#hero-details-button").click({ force: true });

    cy.get("#details-title").should("contain", "미키 17");

    cy.get('label[for="star5"]').click();
    cy.get("#star5").should("be.checked");
    cy.get("#closeModal").click();
    const searchValue = "미키 17";
    cy.get(".search-bar").type(`${searchValue}{enter}`);

    cy.get("#696506").click();
    cy.get("#star5").should("be.checked");
  });
});
