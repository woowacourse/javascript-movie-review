describe("MovieList 기능 테스트", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.wait(1000); //영화데이터를 받아오는 시간을 위해 설정
  });

  it("초기 화면에서 20개의 영화목록을 보여주고, 더보기 버튼 클릭 시 20개의 영화 목록이 추가된다.", () => {
    cy.get("movie-card").should("have.length", 20);

    cy.get("more-button").click();
    cy.get("movie-card").should("have.length", 40);
  });

  it("영화 검색 테스트, 검색 후 더보기 버튼 기능 테스트", () => {
    cy.get(".search-box input").type("해리");
    cy.get(".search-button").click();
    cy.get("movie-card").should("be.visible").contains("해리");

    cy.get("more-button").click();
    cy.get("movie-card").should("be.visible").contains("해리");
  });

  it("검색한 영화가 20개 미만일 경우 더보기 버튼은 보이면 안된다.", () => {
    cy.get(".search-box input").type("듄");
    cy.get(".search-button").click();
    cy.get(".more-button").should("not.exist");
  });
});
