describe("모달 작동 테스트", () => {
  const apiKey = Cypress.env("CYPRESS_API_KEY");
  const localhostUrl = "http://localhost:8080/";
  const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;

  beforeEach(() => {
    cy.visit(localhostUrl);
  });

  it("영화를 클릭하면 모달을 열 수 있다", () => {
    cy.request("GET", popularMovieUrl).as("moviePopular");

    cy.get("movie-list").find("movie-item").first().click();
    cy.get(".modal").should("be.visible");
  });

  it("별점을 클릭하면 해당 점수와 메세지를 볼 수 있다", () => {
    cy.request("GET", popularMovieUrl).as("moviePopular");

    cy.get("movie-list").find("movie-item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get('.vote-stars img[data-order="3"]').click();
    cy.get(".vote-score").should("have.text", "6");
    cy.get(".vote-message").should("have.text", "보통이에요");
  });

  it("닫기 버튼을 클릭하면 모달이 꺼진다", () => {
    cy.request("GET", popularMovieUrl).as("moviePopular");

    cy.get("movie-list").find("movie-item").first().click();
    cy.get(".modal").should("be.visible");

    cy.get(".modal-close-button").click();
    cy.get(".modal").should("not.be.visible");
  });
});
