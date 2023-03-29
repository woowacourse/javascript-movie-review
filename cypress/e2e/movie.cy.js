describe("영화 리뷰 e2e 테스트", () => {
  beforeEach(() => {
    cy.viewport(1260, 1185);
    cy.visit("http://localhost:8080/");
  });
  it("첫 방문시 인기순으로 영화가 화면에 출력된다.", () => {
    cy.get("movie-list").find("movie-item").should("exist");
    cy.get("movie-item").children().should("have.length", 20);
  });

  it("검색어를 입력하면 검색한 영화를 보여준다", () => {
    cy.get(".search-text").type("해리");
    cy.get(".search-button").click();

    cy.get(".movie-container-title").should("contain.text", "해리");
    cy.get("movie-item").children().should("contain.text", "해리");
  });
});
